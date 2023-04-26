var mongoose = require('mongoose');

const transactionsSchema = new mongoose.Schema({
    investmentType: {type:String, required :true},
    Amount : {type: String, required:true},
    status: {type: String, required: true},
});
var Transaction = mongoose.model("ProofPayemnt",transactionsSchema);

module.exports = Transaction;
