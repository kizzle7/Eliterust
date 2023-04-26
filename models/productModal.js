
var mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {type:String, required :true, unique: true},
    price: {type: Number, required: true},
    brand: {type:String, required: true},
    stock: {type:Number, required: true, default: 0},
    image: {type:Object, required:true},
    description: {type: String, required:true},
    category: {type: String, required:true}



});
var Product = mongoose.model("Product", productSchema);

module.exports = Product;
