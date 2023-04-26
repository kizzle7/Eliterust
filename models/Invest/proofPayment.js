var mongoose = require('mongoose');

const proofPyamentSchema = new mongoose.Schema({
    name: {type:String, required :true},
    paidDateDate: {type: Date, required: true},
    payID : {type: String, required:true},
    description: {type: String, required: true},
    proof_image: {type: String, required: true},
});
var Proof = mongoose.model("ProofPayemnt", proofPyamentSchema);

module.exports = Proof;
