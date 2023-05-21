var Plan = require("../models/invest-plans");
module.exports = {
  createPlan: (req, res) => {
    try {
      if (req.body) {
        const plan = new Plan({
          name: req.body.name,
          no_of_days: req.body.no_of_days,
          percent: req.body.percent,
          min: req.body.min,
          max: req.body.max,
          invest_type : req.body.invest_type
        });
        plan.save();
        res.json({ plan: plan });
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

  getPlans: (req, res) => {
    Plan.find({}, (err, result) => {
      if (result) {
        res.json({
          plans: result,
        });
      } else {
        res.json({
          error: err,
        });
      }
    }).sort({ _id: -1 });
  },

  edit: (req, res) => {
    Plan.findById(req.params.id, (error, result) => {
      if (result) {
        result.name = req.body.name;
        result.no_of_days = req.body.no_of_days;
        result.percent = req.body.percent;
        result.min = req.body.min;
        result.max = req.body.max;
        result.invest_type =  req.body.invest_type;
        result.save();
        if (result) {
          res.status(200).json({
            productupdate: result,
            msg: "Plan Updated Successfully",
          });
        } else {
          res.status(500).json({
            msg: error,
          });
        }
      }
    });
  },
};
