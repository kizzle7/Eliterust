var Product = require('../models/productModal')
module.exports = {
	category: (req,res) => {
		const products = Product.find({category: req.params.id}, (err, result) => {
			if(result){
				res.json({
					categoryproducts: result
				})
			}
			else{
				res.json({
					error: err
				})
			}
		
		})
	
	
	},

	price : (req,res) => {
		const productID = Product.find({price: req.params.id}, (error, result) => {
			if(result){
				res.json({
					priceproducts: result
				})
			}
			else{
				res.status(404).send({msg: "Product Not Found"})
			}
		});
	
 		
	},

    
    
}