var Users = require("../../models/invest/users");
var token = require("../../utils");
module.exports = {
  matchtopay: (req, res) => {
    try {
      const login = Users.find(
        { status: 'awaitingPay' },
        (err, result) => {
          if (result) {
            res.json({ awaitingPay: {
              id: result._id,
              name: result.name,
              email: result.email,
              phone: result.role,
              bankName: result.bank,
              accountName: result.accountname,
              accountNumber: result.accountNumber
            }
            });
          } else {
            res.status(401).json({message: 'Invalid Email or Password'});
          }
        }
      );
    } catch (error) {
      res.status(401).json({msg: 'Invalid Email or Password'});

    }

  },
  matchedToRecieve: (req, res) => {
    try {
      const login = Users.find(
        { status: 'awaitingPay' },
        (err, result) => {
          if (result) {
            res.json({ awaitingPay: {
              id: result._id,
              name: result.name,
              email: result.email,
              phone: result.role,
              bankName: result.bank,
              accountName: result.accountname,
              accountNumber: result.accountNumber
            }
            });
          } else {
            res.status(401).json({message: 'Invalid Email or Password'});
          }
        }
      ).sort( { _id: 1, confirmedPay: '1' } )
    } catch (error) {
      res.status(401).json({msg: 'Invalid Email or Password'});

    }

  },

  register: (req, res) => {
    try {
      const user = new Users({
        email: req.body.email,
        name: req.body.name,
        password: req.body.password,
        phone: req.body.phone,
        accountname: req.body.accountName,
        accnumber: req.body.accountNumber,
        bank: req.body.bank,
        plan: req.body.plan,
        role: req.body.role


      });
      const register = user.save();
      res.json({ newUser: user, token: token.getToken(user),message: 'Registration Successful',
 });
    } catch (error) {
      res.json({
        error: ["USER FIELDS NOT AVAILABLE", error.message],
      });
    }
  },

profile: (req, res) => {
  const userID = Users.findOne({_id: req.params.id}, (error, result) => {
    if(result){
      res.json({
        userProfile: result
      })
    }
    else{
      res.status(404).send({msg: "Product Not Found"})
    }
  });


},

users : (req, res) => {
  const users = Users.find({}, (err, result) => {
    if(result){
      res.json({result})
    }
  });


}


};
