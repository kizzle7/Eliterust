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

  getUser: (req, res) => {
    const productID = User.findOne(
      { _id: req.params.id },
      (error, result) => {
        if (result) {
          res.json({
            userInfo: result,
          });
        } else {
          res.status(404).send({ msg: "User Not Found" });
        }
      }
    );
  },
};
