var Users = require("../models/user");
var CountryModel = require("../models/country").Country;
var ClubModel = require("../models/country").Club;
var PlayerModel = require("../models/country").Player;
var CategoryModel = require("../models/country").Category;
var RenderModel = require("../models/country").Render;

var request = require("request");
var _ = require("underscore");
const token = require("../utils");
var AuthUser = require('../utils');
var bcrypt = require('bcryptjs')
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
     const product = PlayerModel.findById(req.params.id, (error, result) =>{
      if(result){
        result.playerName = req.body.name;
        result.club =  req.body.club;
        result.playerImage = result.playerImage;
        const player = result.save();
        if(result){
          res.status(200).json({
            playerupdate: result,
            msg: 'Player Updated Successfully'
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
    const product =  PlayerModel.findById(req.params.id,(err, result) => {
      if(result){
        result.remove();
        res.json({
          msg: "Player Deleted"
        })
      }
      else{
        res.json({msg: err})
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

    const image = new Image({
      image: req.file.path
    })

    const ImageSave = image.save();
    res.json({
      success: true,
      image: image
    })
    next



  },
  login: (req, res) => {

   try{
     Users.findOne({email: req.body.email}, (err, result) => {
       if(!result){
         res.json({success: true, message: 'Invalid Credentials', status: 400})
       }
       else{
         const passwordCheck = bcrypt.compareSync(req.body.password, result.password);
         if(!passwordCheck){
           res.json({success:true, message: 'invalid Credentials', status: 400});
         }
         else {
           const user = {
             name: result.name,
             id:result._id,
             email: result.email,
             phone: result.phone,
             password: result.password,
             token: token.getToken(result)
           }
           res.json({success:true, message:'Login Successful', role:'user', user, status:200})
         }
       }
     })

   }
 catch(err){
   res.json({success:false, message: err, status:500});
 }

 },
 register: async (req, res) => {
   try{
     Users.findOne({email: req.body.email}, (err, result) => {
       if(result){
         res.json({
           message: 'Account Already Exists', success: true, status: 400
         })
       }
       else{
         const user = new Users();
                   user.name = req.body.name;
                   user.password = bcrypt.hashSync(req.body.password, 10);
                   user.email = req.body.email;
                       user.save().then((created) => {
                         const newUser = {
                               id: created._id,
                               name: created.name,
                               email: created.email,
                               password: created.password
                           }
                           res.json({success:true, message:'Registration Successful', role:'user', user,token: token.getToken(newUser), status:200})



                       })


                     }






       })
   }
   catch(err){
     res.json({success:false, message: err, status:500});
   }
 },

 addCountry: (req, res, next) => {
   const country = new CountryModel({
     countryName: req.body.name,
     countryFlag: req.file,
     league: req.body.league,

   })
   console.log(req.file)
   const countryCreated = country.save();
   if(country){
     res.status(201).json({
       countryInfo: country,
       msg: "Country Created Successfully"
     })
   }




 },

 getCountry: (req, res, next) => {
   const countries = CountryModel.find({}, (err, result) => {
     if(result){
       res.json({
         list: result
       })
     }
     else{
       res.json({
         error: err
       })
     }

   }).sort( { _id: -1 } )
 },

 getClub: (req, res, next) => {
   const countries = ClubModel.find({}, (err, result) => {
     if(result){
       res.json({
         list: result
       })
     }
     else{
       res.json({
         error: err
       })
     }

   }).sort( { _id: -1 } )
 },

 getPlayer: (req, res, next) => {
   const  {page= 1, limit = 10} = req.query

   const countries = PlayerModel.find({},{ category: 0 }, (err, result) => {
     if(result){
       res.json({
         list: result,
         total: result.length
       })
     }
     else{
       res.json({
         error: err
       })
     }

   }).limit(limit * 1).skip((page-1 )* limit)
   .sort( { _id: -1,} )

   console.log('moneyyy')

   PlayerModel.find({},{ category: 0 }, (err, result) => {
     if(result){
       res.json({
         list2: result,
         total2: result.length
       })
     }
     else{
       res.json({
         error: err
       })
     }

   })
 },

 getCat: (req, res, next) => {
   const countries = CategoryModel.find({}, (err, result) => {
     if(result){
       res.json({
         list: result
       })
     }
     else{
       res.json({
         error: err
       })
     }

   }).sort( { _id: -1 } )
 },

 getRender: (req, res, next) => {
   const countries =RenderModel.find({}, (err, result) => {
     if(result){
       res.json({
         list: result
       })
     }
     else{
       res.json({
         error: err
       })
     }

   }).sort( { _id: -1 } )
 },






 addClub : (req,res) => {

   ClubModel.create({
     clubName: req.body.club,
     clubFlag: req.file
   }).then(function(dbReview) {
      // If a Review was created successfully, find one Product with an `_id` equal to `req.params.id`. Update the Product to be associated with the new Review
      // { new: true } tells the query that we want it to return the updated Product -- it returns the original by default
      // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
      return CountryModel.findOneAndUpdate({ _id: req.params.id }, {$push: {clubs: dbReview._id}}, { new: true });
    })
    .then(function(dbProduct) {
      // If we were able to successfully update a Product, send it back to the client
      res.json(dbProduct)
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });;


 },

 getAll: (req, res) => {
   CountryModel.findOne({ _id: req.params.id })
    // ..and populate all of the notes associated with it
    .populate('clubs')
    .then(function(dbProduct) {
      // If we were able to successfully find an Product with the given id, send it back to the client
      res.json(dbProduct.clubs);
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });


 },

 getAllPlayer: (req, res) => {
   const  {page= 1, limit = 10} = req.query
   RenderModel.findOne({ _id: req.params.id })
    // ..and populate all of the notes associated with it
    .populate("players")
    .then(function(dbProduct) {
      // If we were able to successfully find an Product with the given id, send it back to the client
      res.json(dbProduct).limit(limit * 1).skip((page-1 )* limit)
      .sort( { _id: -1,} );
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
 },


 addPng: (req,res) => {

   PlayerModel.create({
     playerName: req.body.name,
     club: req.body.club,
     playerImage: req.file,
     category: req.body.cat
   }).then(function(dbReview) {

      return RenderModel.findOneAndUpdate({ _id: req.params.id }, {$push: {players: dbReview._id}}, { new: true });
    })
    .then(function(dbProduct) {
      // If we were able to successfully update a Product, send it back to the client
      res.json(dbProduct)
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });;



 },
 addCategory: (req,res) => {
   const category = new CategoryModel({
     categoryName: req.body.name,
     categoryImage:  req.file
   })
   const catCreated = category.save();
   if(category){
     res.status(201).json({
       catinfo: category,
       msg: "Category Created Successfully"
     })
   }

 },

 addRender: (req,res) => {
   const render = new RenderModel({
     renderName: req.body.name,
   })
   const renderCreated = render.save();
   if(render){
     res.status(201).json({
       renderinfo: render,
       msg: "C  Created Successfully"
     })
   }

 },

 search: (req,res,next) => {
   const search  = req.params.id
const regex = new RegExp(search, 'i') // i for case insensitive
   PlayerModel.find({playerName: {$regex : regex}}, function(err, result){
     if (err) {
         console.log('Not a Valid Search');
         res.status(500).send(err, 'Not a Valid Search');
     }else {
         res.json({player:  result,});
     }
   })


 },

 getSearched: (req, res, next) => {

   PlayerModel.find({category: req.body.cat}, function(err, result){
     if (err) {
         console.log('Not a Valid Search');
         res.status(500).send(err, 'Not a Valid Search');
     }else {
         res.json({result:  result,  type: req.body.cat,});
     }
   })




 },

 clubPlayers: (req, res, next) =>{
   PlayerModel.find({club: req.params.id}, function(err, result){
     if (err) {
         console.log('Not a Valid Search');
         res.status(500).send(err, 'Not a Valid Search');
     }else {
         res.json({player:  result});
     }
   })

 },

 Conedit : (req, res) => {
    const product = CountryModel.findById(req.params.id, (error, result) =>{
     if(result){
       console.log(result)
       result.countryName = req.body.name;
       result.league =  req.body.league;
       result.countryFlag = req.file ? req.file : result.countryFlag
       const player = result.save();
       if(result){
         res.status(200).json({
           playerupdate: result,
           msg: 'Player Updated Successfully'
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

 Condelete : (req, res) => {
   const product =  CountryModel.findById(req.params.id,(err, result) => {
     if(result){
       result.remove();
       res.json({
         msg: "Player Deleted"
       })
     }
     else{
       res.json({msg: err})
     }
   });


 },

 Cedit : (req, res) => {
    const product = ClubModel.findById(req.params.id, (error, result) =>{
     if(result){
       result.clubName = req.body.name;
       result.clubFlag = result.clubFlag
       const player = result.save();
       if(result){
         res.status(200).json({
           clubupdate: result,
           msg: 'Player Updated Successfully'
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

 Cdelete : (req, res) => {
   const product =  ClubModel.findById(req.params.id,(err, result) => {
     if(result){
       result.remove();
       res.json({
         msg: "Player Deleted"
       })
     }
     else{
       res.json({msg: err})
     }
   });


 },

  Catdelete : (req, res) => {
    const product = CategoryModel.findById(req.params.id,(err, result) => {
      if(result){
        result.remove();
        res.json({
          msg: "Player Deleted"
        })
      }
      else{
        res.json({msg: err})
      }
    });


  },

 singleClub : (req,res) => {
   const productID = ClubModel.findOne({_id: req.params.id}, (error, result) => {
     if(result){
       res.json({
         club: result
       })
     }
     else{
       res.status(404).send({msg: "Product Not Found"})
     }
   });


 },

 singlePng : (req,res) => {
   const productID = PlayerModel.findOne({_id: req.params.id}, (error, result) => {
     if(result){
       res.json({
         png: result
       })
     }
     else{
       res.status(404).send({msg: "Product Not Found"})
     }
   });


 },

 singleCont : (req,res) => {
   const productID = CountryModel.findOne({_id: req.params.id}, (error, result) => {
     if(result){
       res.json({
         country: result
       })
     }
     else{
       res.status(404).send({msg: "Product Not Found"})
     }
   });


 },

 singleLig : (req,res) => {
   const productID = CountryModel.findOne({_id: req.params.id}, (error, result) => {
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


};
