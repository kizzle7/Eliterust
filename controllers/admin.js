var User = require("../models/user");
var request = require("request");
var _ = require("underscore");
var Product =  require('../models/productModal');
var AuthUser = require('../utils');
module.exports = {
  create : (req, res, next) => {
    console.log(req.file)
    const product = new Product({
      name: req.body.name,
      brand: req.body.brand,
      price: req.body.price,
      category: req.body.category,
      stock: req.body.stock,
      description :  req.body.description,
      image: req.file
    })
    const productCreated = product.save();
    if(product){
      res.status(201).json({
        product: product,
        msg: "Product Created Successfully"
      })
    }

  },

  edit : (req, res) => {
     const product = Product.findById(req.params.id, (error, result) =>{
      if(result){
        result.name = req.body.name;
        result.brand =  req.body.brand;
        result.description = req.body.description;
        result.price = req.body.price;
        result.category = req.body.category;
        result.stock = req.body.stock;
        result.image = req.body.file;
        const product = result.save();
        if(result){
          res.status(200).json({
            productupdate: result,
            msg: 'Product Updated Successfully'
          })
        }
        else{
          res.status(500).json({
            msg: error
          })
        }

      }
    });


  },

  delete : (req, res) => {
    const product =  Product.findById(req.params.id,(err, result) => {
      if(result){
        result.remove();
        res.json({
          msg: "Product Deleted"
        })
      }
      else{
        res.json({msg: "Error in Deleting Product"})
      }
    });


  },

  upload: (req, res, next) => {
    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, './uploads/');

      },
      filename : (req,file,cb) => {
        cb(null,  Date.now() + file.originalname);

      }
    })

    const fileFilter = (req,res,cd) => {
      if(file.mimetype === "image/jpeg" ||  file.mimetype === "image/png"){
        cb(null, true)
      }
      else{
        cb(null, false)
      }
    }

    const upload = multer({
      storage: storage,
      limits:{
        fileSize: 1024 * 1024 * 5
      },
      fileFilter: fileFilter
    })

    const image = new Product({
      image: req.file.path
    })

    const ImageSave = image.save();
    res.json({
      success: true,
      image: image
    })
    next



  }

};
