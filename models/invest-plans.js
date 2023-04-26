var mongoose = require("mongoose");

const authSchema = new mongoose.Schema({
  name: { type: String, required: false },
  percent: { type: String, required: false },
  no_of_days: { type: String, required: false },
  min: { type: String, required: false },
  max: { type: String, required: false },
  invest_type:{ type: String, required: false }
});
var Auth = mongoose.model("plans", authSchema);

module.exports = Auth;
