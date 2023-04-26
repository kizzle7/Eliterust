var Product = require('../models/productModal')
module.exports = {
	allProducts: (req,res) => {
		const products = Product.find({}, (err, result) => {
			if(result){
				res.json({
					products: result
				})
			}
			else{
				res.json({
					error: err
				})
			}
		
		}).sort( { _id: -1 } )
	
	
	},

	singleProduct : (req,res) => {
		const productID = Product.findOne({_id: req.params.id}, (error, result) => {
			if(result){
				res.json({
					product: result
				})
			}
			else{
				res.status(404).send({msg: "Product Not Found"})
			}
		});
	
 		
	},

    
    
}