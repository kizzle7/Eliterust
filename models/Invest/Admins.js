var mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    name: {type:String, required :true},
    isAdmin: {type: Boolean, default: true},
    password: {type: String, required: true},
});
var Admins = mongoose.model("Admins",adminSchema);

module.exports = {
    Admins,
    adminSchema
}
