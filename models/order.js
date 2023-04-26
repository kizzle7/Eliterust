
var mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    firstname: {type:String, required :true},
    lastname: {type: String, required: true},
    phonenumber: {type:Number, required: true},
    email: {type:String, required: true},
    city: {type:String, required:true},
    address: {type:String, required:true},
    status: {type:Number, required: true, default: 0},
    delivery: {type:Number, required: true , default: 0},
    products: [
        {
          name: String,
          size: String,
          qty: { type: Number, default: 1 },
          price: { type: Number },
         
        }
      ],
    




});
var Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
