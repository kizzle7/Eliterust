var mongoose = require('mongoose');

const countrySchema = new mongoose.Schema({
    countryName: {type:String},
    countryFlag : {type: Object},
    league : {type: String},
    clubs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Club' }]

});
var Country = mongoose.model("Country", countrySchema);

const categorySchema = new mongoose.Schema({
    categoryName: {type:String, required :true},
    categoryImage: {type:Object, required :true},

});
var Category = mongoose.model("Category", categorySchema);


const clubSchema = new mongoose.Schema({
    clubName:{ type: String, },
    clubFlag: {type:Object},
});
var Club = mongoose.model("Club", clubSchema);

const playerSchema = new mongoose.Schema({
    playerName: {type:String},
    playerImage: {type:Object},
    category: {type:String},
    club: {type:String},

});
var Player= mongoose.model("Player", playerSchema);

const renderSchema = new mongoose.Schema({
    renderName: {type:String, required :true},
    players: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Player' }]

});
var Render = mongoose.model("Render", renderSchema);


module.exports = {
  Country, Club, Player,Category, Render
}
