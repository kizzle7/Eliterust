var Invest = require("../models/invest-user");
var Plan = require("../models/invest-plans");
var dt = new Date();
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
          invest_type: req.body.invest_type,
          investmentdatecreated: new Date().toLocaleDateString(),
          investmentdays: req.body.invest_days,
          status: "Growing",
          maturityTime: dt.setDate(dt.getDate() + req.body.invest_days),
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

  updateInvestment: (req, res) => {
    Invest.find({ user_id: req.params.id }, (err, result) => {
      if (result) {
        const allInvestmentsGrowing = result.filter(
          (a) => a.status === "Growing"
        );
        getDailyIncreamenttillMatureTotal = [];
        allInvestmentsGrowing?.map((dt) => {
          getDailyIncreamenttillMatureTotal.push({
            amount:
              (parseInt(dt?.amount) * parseInt(dt?.percent)) /
              100 /
              dt?.investmentdays,
            user_id: dt?.user_id,
            invest_id: dt?.invest_id,
            potentialAmt: dt?.potentialAmt,
            profit: dt?.profit,
            invest_name: dt?.invest_name,
            percent: dt?.percent,
            invest_type: dt?.invest_type,
            investmentdatecreated: dt?.investmentdatecreated,
            id: dt?._id,
          });
        });
        var sumTotal = getDailyIncreamenttillMatureTotal.reduce(
          (accumulator, currentValue) => {
            return accumulator + currentValue;
          },
          0
        );
        // console.log(getDailyIncreamenttillMatureTotal)
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
                result.potentialAmt =  Number(result.potentialAmt + idLists?.amount);
                result.save();
                console.log(result)
              } else {
                console.log("its not same");
              }
              // console.log(result);

              // if(result){
              //   res.status(200).json({
              //     productupdate: result,
              //     msg: 'Product Updated Successfully'
              //   })
              // }
              // else{
              //   res.status(500).json({
              //     msg: error
              //   })
              // }
            }
          );
        }
        // res.json({
        //   totalPortfolioInvestment: sumTotal,
        // });
      } else {
        res.json({
          error: err,
        });
      }
    });
  },
};
