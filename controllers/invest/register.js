var User = require("../models/invest/user");
var token = require("../utils");
module.exports = {
  login: (req, res) => {

    try {
      const login = User.findOne(
        { email: req.body.email, password: req.body.password },
        (err, result) => {
          if (result) {
            res.json({ user: {
              id: result._id,
              name: result.name,
              email: result.email,
              token: token.getToken(result)},
              role: result.role
            });
          } else {
            res.status(401).json({msg: 'Invalid Email or Password'});
          }
        }
      );
    } catch (error) {
      res.status(401).json({msg: 'Invalid Email or Password'});

    }

  },

  register: (req, res) => {
    try {
      const user = new User({
        email: req.body.email,
        name: req.body.name,
        password: req.body.password,
        phone: req.body.phone,
        accountname: req.body.accountName,
        accountnumber: req.body.accountNumber,
        bank: req.body.bank,

      });
      const register = user.save();
      res.json({ newUser: user, token: token.getToken(user) });
    } catch (error) {
      res.json({
        error: ["USER FIELDS NOT AVAILABLE", error.message],
      });
    }
  },

  loginAdmin: (req, res) => {

    try {
      const loginAdmin = User.findOne(
        { email: req.body.email, password: req.body.password, isAdmin: true },
        (err, result) => {
          if (result) {
            res.json({ userAdmin: {
              id: result._id,
              name: result.name,
              email: result.email,
              isAdmin: result.isAdmin,
              token: token.getToken(result)}
            });
          } else {
            res.status(401).json({msg: 'Invali Email or Password'});
          }
        }
      );
    } catch (error) {
      res.status(401).json({msg: 'Invalid Email or Password'});

    }

  },

  users : (req, res) => {
    const users = User.find({}, (err, result) => {
      if(result){
        res.json({result})
      }
    });


  }
};
