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
};
