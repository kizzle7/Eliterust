var mongoose = require("mongoose");

const authSchema = new mongoose.Schema({
  invest_id: { type: String, required: false },
  user_id: { type: String, required: false },
  amount: { type: Number, required: false },
  profit: { type: String, required: false },
  maturityTime: { type: Date, default: Date.now },
  invest_name: { type: String, required: false },
  invest_type: { type: String, required: false },
  potentialAmt: { type: Number, required: false },
  status: { type: String, required: "Growing" },
  fullPotentialAmtCl: { type: Number, required: false, defaultValue: 0 },
  percent: { type: String, required: false },
  incCount: { type: Number, required: false, defaultValue: 0 },
  investmentdatecreated: { type: String, required: false },
  investmentdays: { type: Number, required: false },
  validPotentialAmt: { type: Number, required: false, default: 0 },
  fullVestedAmount: { type: Number, required: false, default: 0 },
  perRate: { type: Number, required: false, default: 0 },
});
var Auth = mongoose.model("investments", authSchema);

module.exports = Auth;
