var Order = require('../models/order')
module.exports = {
	all: (req,res) => {
		const deliveries = Order.find({status: 1}, (err, result) => {
			if(result){
				res.json({
					addressed: result
				})
			}
			else{
				res.json({
					error: err
				})
			}
		
		}).sort( { _id: -1 } )


	},

	confirm : (req, res) => {
        const order = Order.findById(req.params.id, (error, result) =>{
        if(result){
          result.delivery = req.body.delivery
          const order = result.save();
          if(result){
            res.status(200).json({
              order: result,
              msg: 'Order Delivery Updated Successfully'
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


  delete : (req, res) => {
    const product =  Order.findById(req.params.id,(err, result) => {
      if(result){
        result.remove();
        res.json({
          msg: "Delivery Deleted"
        })
      }
      else{
        res.json({msg: "Error in Deleting Product"})
      }
    });


  },


}
