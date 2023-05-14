var Invest = require("../models/invest-user");
var Plan = require("../models/invest-plans");
var dt = new Date();
var CronJob = require("cron").CronJob;
var cron = require("node-cron");
let currentDate = Date.now();
currentDateVal = new Date(currentDate).toLocaleDateString();
module.exports = {
  createInvestementt: (req, res) => {
    try {
      if (req.body) {
        const plan = new Invest({
          user_id: req.body.id,
          invest_id: req.body.invest_id,
          amount: req.body.amount,
          potentialAmt: req.body.potentialAmt,
          profit: req.body.profit,
          invest_name: req.body.invest_name,
          percent: req.body.percent,
          perRate:req.body.perRate,
          fullPotentialAmtCl: req.body.fullPotentialAmt,
          fullVestedAmount: parseInt(req.body.amount) + req.body.profit,
          invest_type: req.body.invest_type,
          investmentdatecreated: new Date().toLocaleDateString(),
          investmentdays: req.body.invest_days,
          status: "Growing",
          maturityTime: dt.setDate(dt.getDate() + Number(req.body.invest_days)),
        });
        plan.save();
        res.json({ investment: plan });
      }
    } catch (error) {
      res.json({
        error: ["USER FIELDS NOT AVAILABLE", error.message],
      });
    }
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
      if (result) {
        for (var i = 0, l = result.length; i < l; i++) {
          if (
            result[i].potentialAmt.toString() ===
            result[i].fullVestedAmount.toString() && result[i].status !== 'Matured'
          ) {
            Invest.findOne({ _id: result[i]._id }, (error, result) => {
              result.status = "Matured";
              result.save();
              return;
            });
          } else {
            module.exports.updateInvestment(id);
          }
        }
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
    Invest.find({ user_id: id }, (err, result) => {
      if (result) {
        const allInvestmentsGrowing = result.filter(
          (a) => a.status === "Growing"
        );
        if (allInvestmentsGrowing?.length > 0) {
          getDailyIncreamenttillMatureTotal = [];
          allInvestmentsGrowing?.map((dt) => {
            getDailyIncreamenttillMatureTotal.push({
              amount: Number(dt?.profit / dt?.investmentdays),
              user_id: dt?.user_id,
              invest_id: dt?.invest_id,
              potentialAmt: dt?.potentialAmt,
              profit: dt?.profit,
              fullPotentialAmtCl:dt?.fullPotentialAmtCl,
              investmentdays:dt?.investmentdays,
              invest_name: dt?.invest_name,
              percent: dt?.percent,
              invest_type: dt?.invest_type,
              perRate:dt?.perRate,
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
                  result.validPotentialAmt = Number(
                    result.potentialAmt + idLists?.amount
                  );
                  result.potentialAmt =
                    result.potentialAmt + idLists?.perRate;
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
          console.log('no error')
        }
      }
    });
  },
};
