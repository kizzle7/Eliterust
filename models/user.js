var mongoose = require('mongoose');

const authSchema = new mongoose.Schema({
    name: {type:String, required :true},
    email : {type: String, required:true, unique: true, dropDups: true},
    city: {type: String, required: false},
    state: {type: String, required: false},
    address: {type: String, required: false},
    phone: {type: String, required: true,unique: true, },
    password: {type: String, required: true},
    wallet: {type: Number, required: false, default: 0},
    portfolio: {type: Number, required: false, default:0},

    isAdmin : {required: true, type : Boolean, required:true, default: false}
});
var Auth = mongoose.model("users", authSchema);

module.exports = Auth;
