var mongoose = require('mongoose');

const authSchema = new mongoose.Schema({
    giftcard_number: {type: String, required: false},
    gitcard_type: {type: String, required: false },
    btc_rate_value: {type: String, required: false},
    amount: {type: Number, required: false, default: 0},
    btc_address:{type: String, required: false},
    payment_type: {type: String, required: false},
    gitcard_img:{type: String, required: false},
    user_id: {type: String, required: false},
    payment_ref: {type: String, required: false, unique:true},
    payment_type: {type: String, required: false},
    date: {type: Date, default: Date.now },
    payment_status: {type: String, required: false, default: 'inactive'},


});
var Payment = mongoose.model("cl_payment", authSchema);

module.exports = Payment;
