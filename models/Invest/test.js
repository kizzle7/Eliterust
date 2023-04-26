var mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
    companyName: {type:String, required :true},
    firstParty : {type: Boolean, required:true},
    webiste: {type: String, required: true},
});
var Test = mongoose.model("Test",testSchema);

module.exports = {
    testSchema,
    Test
}
