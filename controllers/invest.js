var Invest = require("../models/invest-user");
var Plan = require("../models/invest-plans");
var dt = new Date();
var User = require("../models/user");
var Transactions = require("../models/transactions");
const request = require("request");
var https = require("https");
var btc = require("bitcoin-exchange-rate");
var CronJob = require("cron").CronJob;
var cron = require("node-cron");
const {
  UserBindingContext,
} = require("twilio/lib/rest/chat/v2/service/user/userBinding");
let currentDate = Date.now();
currentDateVal = new Date(currentDate).toLocaleDateString();
module.exports = {
  createInvestementt: (req, res) => {
    try {
      if (req.body) {
        User.findById({ _id: req.body.id }, (err, resultUser) => {
          if (resultUser) {
            const balance = resultUser.wallet;
            if (req.body.amount <= balance) {
              resultUser.wallet = balance - req.body.amount;
              const plan = new Invest({
                user_id: req.body.id,
                invest_id: req.body.invest_id,
                amount: req.body.amount,
                potentialAmt: req.body.potentialAmt,
                profit: req.body.profit,
                invest_name: req.body.invest_name,
                percent: req.body.percent,
                perRate: req.body.perRate,
                fullPotentialAmtCl: req.body.fullPotentialAmt,
                fullVestedAmount: parseInt(req.body.amount) + req.body.profit,
                invest_type: req.body.invest_type,
                investmentdatecreated: new Date().toLocaleDateString(),
                investmentdays: req.body.invest_days,
                status: "Growing",
                incCount: 0,
                maturityTime: dt.setDate(
                  dt.getDate() + Number(req.body.invest_days)
                ),
              });
              const trans = new Transactions({
                amount: req.body.amount,
                trans_type: "Investment",
                trans_type_mode: req.body.invest_name,
                txn_type: "Debit",
                user_id: req.body.id,
                trans_status: "Completed",
                trans_ref:
                  new Date().getTime().toString(36) +
                  Math.random().toString(36).slice(2),
              });

              plan.save();
              trans.save();
              resultUser.save();
              res.status(200).json({ investment: plan });
            } else {
              res.status(400).json({ msg: "Insufficient Balance!" });
            }
          }
        });
      }
    } catch (error) {
      res.status(400).json({
        error: ["USER FIELDS NOT AVAILABLE", error.message],
      });
    }
  },
  getBtcPrice: (req, res) => {
    const currency = "USD";

    const url =
      "https://blockchain.info/tobtc?currency=" +
      currency +
      "&value=" +
      req.body.amount;

    const request = https.request(url, (response) => {
      let data = "";
      response.on("data", (chunk) => {
        data = data + chunk.toString();
      });
      response.on("end", () => {
        const body = JSON.parse(data);
        console.log(body);
        res.json({
          rate: body,
        });
      });
    });

    request.on("error", (error) => {
      console.log("An error", error);
    });

    request.end();
  },

  delete: (req, res) => {
    Plan.findById(req.params.id, (err, result) => {
      if (result) {
        result.remove();
        res.json({
          msg: "Plan Deleted",
        });
      } else {
        res.json({ msg: "Error in Deleting Plan" });
      }
    });
  },

  getInvestment: (req, res) => {
    Invest.find({ user_id: req.params.id }, (err, result) => {
      if (result) {
        res.json({
          myinvtesments: result,
        });
      } else {
        res.json({
          error: err,
        });
      }
    }).sort({ _id: -1 });
  },
  investWatcher: (id) => {
    Invest.find({ user_id: id }, (err, result) => {
      if (result?.length > 0) {
        for (var i = 0, l = result.length; i < l; i++) {
          if (Number(result[i]?.incCount === result[i]?.investmentdays)) {
            Invest.findOne({ _id: result[i]._id }, (error, result) => {
              User.findOne({ _id: result.user_id }, (err, res) => {
                if (res) {
                  res.portfolio =
                    Number(res.portfolio) + Number(result?.potentialAmt);
                  res.save();
                }
              });
              result.status = "Matured";
              result.save();
              return;
            });
          } else {
            console.log("proceed to update");
            module.exports.updateInvestment(id);
          }
        }
      } else {
        res.json({
          error: "No investments created yet",
        });
      }
    });
  },

  updateWallet: (req, res) => {
    Invest.findOne({ _id: req.body.id }, (err, result) => {
      if (result) {
        User.findOne({ _id: result.user_id }, (err, res) => {
          if (res) {
            res.wallet = res.wallet + result?.potentialAmt;
            res.save();
            result.status = "Redeemed";
            const trans = new Transactions({
              amount: result?.potentialAmt,
              trans_type: "Investment",
              trans_type_mode: "Portfolio Profit",
              user_id: result.user_id,
              txn_type: "Credit",
              trans_status: "Completed",
              trans_ref:
                new Date().getTime().toString(36) +
                Math.random().toString(36).slice(2),
            });
            trans.save();
            result.save();
          }
        });
        res.json({
          data: result,
        });
      } else {
        res.json({
          error: err,
        });
      }
    });
  },

  initiateWatcher: (req, res) => {
    module.exports.investWatcher(req.params.id);
    

    // cron.schedule("00 00 00 * * * ", () => {
    //   module.exports.investWatcher(req.params.id);
    // });
    // var cronJob1 = new CronJob({
    //   cronTime: "00 00 00 * * * ",
    //   onTick: function () {
    //     module.exports.investWatcher(req.params.id);
    //   },
    //   start: true,
    //   runOnInit: false,
    // });
  },

  updateInvestment: (id) => {
    Invest.find({ user_id: id, status: "Growing" }, (err, result) => {
      if (result) {
        const allInvestmentsGrowing = result;
        if (allInvestmentsGrowing?.length > 0) {
          getDailyIncreamenttillMatureTotal = [];
          allInvestmentsGrowing?.map((dt) => {
            getDailyIncreamenttillMatureTotal.push({
              amount: Math.round(dt?.profit / dt?.investmentdays),
              user_id: dt?.user_id,
              invest_id: dt?.invest_id,
              potentialAmt: dt?.potentialAmt,
              profit: dt?.profit,
              fullPotentialAmtCl: dt?.fullPotentialAmtCl,
              investmentdays: dt?.investmentdays,
              incCount: dt.incCount,
              invest_name: dt?.invest_name,
              percent: dt?.percent,
              invest_type: dt?.invest_type,
              perRate: dt?.perRate,
              investmentdatecreated: dt?.investmentdatecreated,
              id: dt?._id,
            });
          });

          for (
            var i = 0, l = getDailyIncreamenttillMatureTotal.length;
            i < l;
            i++
          ) {
            const idLists = getDailyIncreamenttillMatureTotal[i];
            Invest.findOne(
              { _id: getDailyIncreamenttillMatureTotal[i].id },
              (error, result) => {
                if (result._id.toString() === idLists?.id.toString()) {
                  result.validPotentialAmt = Math.round(
                    result.potentialAmt + idLists?.amount
                  );
                  result.incCount = result.incCount + 1;
                  result.potentialAmt = Math.round(
                    result.potentialAmt + idLists?.perRate
                  );
                  
                  result.save();
                  console.log(result);
                } else {
                }
              }
            );
          }
          // res.json({
          //   totalPortfolioInvestment: sumTotal,
          // });
        } else {
          console.log("no error");
        }
      }
    });
  },
};
