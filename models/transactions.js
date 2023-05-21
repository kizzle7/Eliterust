var mongoose = require("mongoose");

const authSchema = new mongoose.Schema({
  amount: { type: Number, required: false, default: 0 },
  user_id: { type: String, required: false },
  trans_ref: { type: String, required: false, unique: true },
  trans_type: { type: String, required: false },
  payment_ref: { type: String, required: false },
  trans_type_mode: { type: String, required: false },
  txn_type: { type: String, required: false },
  date: { type: Date, default: Date.now },
  trans_status: { type: String, required: false, default: "inactive" },
});
var Transactions = mongoose.model("transactions", authSchema);

module.exports = Transactions;
