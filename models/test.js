var mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
    artist: {type:String, required :true},
    albums : [
        {
          title: {type: String},
          year: {type: Number}

        }
      ],
    singers: {type: String, required: true},
});
var Test = mongoose.model("Auth", testSchema);

module.exports = Test;
