var Order = require("../models/order");
var request = require("request");
var _ = require("underscore");

module.exports = {
  create : (req, res, next) => {
    const order = new Order({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      phonenumber: req.body.phonenumber,
      email: req.body.email,
      city: req.body.city,
      address :  req.body.address,
      status: 0,
      delivery: 0,
      products: req.body.products

    })
    const productCreated = order.save();
    if(order){
      res.status(201).json({
        order: order,
        msg: "Order Created Successfully"
      })
    }

  },

  orders: (req, res) => {
    const orders = Order.find({}, (err, result) => {
      if(result){
        res.json({
          orders: result
        })
      }
      else{
        res.json({
          error: err
        })
      }


}).sort( { _id: -1 } )
},

delete : (req, res) => {
  const order =  Order.findById(req.params.id,(err, result) => {
    if(result){
      result.remove();
      res.json({
        msgi: "Order Deleted"
      })
    }
    else{
      res.json({msg: "Error in Deleting Order"})
    }
  });


},

edit : (req, res) => {
  const order = Order.findById(req.params.id, (error, result) =>{
  if(result){
    result.status = req.body.status
    const order = result.save();
    if(result){
      res.status(200).json({
        order: result,
        msg: 'Order Updated Successfully'
      })
    }
    else{
      res.status(500).json({
        msg: error
      })
    }

  }

}
  )},


  singleOrder : (req,res) => {
		const orderID = Order.findOne({_id: req.params.id}, (error, result) => {
			if(result){
				res.json({
					order: result
				})
			}
			else{
				res.status(404).send({msg: "Order Not Found"})
			}
		});
	
 		
	},
}
