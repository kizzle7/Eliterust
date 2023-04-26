var Product = require('../models/productModal')
module.exports = {
	categoryCombo: (req,res) => {
		const products = Product.find({'price': req.body.price, 'category': req.body.category}, (err, result) => {
			if(result){
				res.json({
					categoryCombo: result
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