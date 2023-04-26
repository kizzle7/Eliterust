var mongoose = require('mongoose');
var Test = require('./test').testSchema;
const test2Schema = new mongoose.Schema({
    title: {type:String, required :true},
    publisher: Test
});
var Test2 = mongoose.model("Test2",test2Schema);

module.exports = Test2;
