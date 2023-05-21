var Product = require("../models/productModal");
var User = require("../models/user");

module.exports = {
  allProducts: (req, res) => {
    const products = Product.find({}, (err, result) => {
      if (result) {
        res.json({
          products: result,
        });
      } else {
        res.json({
          error: err,
        });
      }
    }).sort({ _id: -1 });
  },
  getUsersList: (req, res) => {
    const products = User.find({}, (err, result) => {
      if (result) {
        res.json({
          users: result,
        });
      } else {
        res.json({
          error: err,
        });
      }
    }).sort({ _id: -1 });
  },
  edit: (req, res) => {
    User.findById(req.params.id, (error, result) => {
      if (result) {
        result.address = req.body.address;
        result.city = req.body.city;
        result.country = req.body.country;
        result.state = req.body.state;
       
        result.save();
        if (result) {
          res.status(200).json({
            userUpdate: result,
            msg: "User Updated Successfully",
          });
        } else {
          res.status(500).json({
            msg: error,
          });
        }
      }
    });
  },

  editKyc: (req, res) => {
    User.findById(req.params.id, (error, result) => {
      if (result) {
        result.identityType = req.body.identityType;
        result.identityImage = req.body.identityImage;
        result.save();
        if (result) {
          res.status(200).json({
            userUpdate: result,
            msg: "User Updated Successfully",
          });
        } else {
          res.status(500).json({
            msg: error,
          });
        }
      }
    });
  },

  editAcc: (req, res) => {
    User.findById(req.params.id, (error, result) => {
      if (result) {
        result.bankName = req.body.bankName;
        result.accName = req.body.accName;
        result.accNum = req.body.accNum;
        result.routing = req.body.routing;
        result.accType = req.body.accType;

        result.save();
        if (result) {
          res.status(200).json({
            userUpdate: result,
            msg: "User Updated Successfully",
          });
        } else {
          res.status(500).json({
            msg: error,
          });
        }
      }
    });
  },

  getUser: (req, res) => {
    const productID = User.findOne({ _id: req.params.id }, (error, result) => {
      if (result) {
        res.json({
          userInfo: result,
        });
      } else {
        res.status(404).send({ msg: "User Not Found" });
      }
    });
  },
};
