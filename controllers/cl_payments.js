var Payment = require("../models/payment");
var User = require("../models/user");
var token = require("../utils");
module.exports = {
  makePayment: (req, res) => {
    try {
      if (req.body.id) {
        const payment = new Payment({
          amount: req.body.amount,
          paymnet_type: req.body.type,
          gitcard_type: req.body.gitcardType,
          gitcard_number: req.body.gitcardNumber,
          btc_rate_value: req.body.valueRate,
          user_id: req.body.id,
          payment_type: req.body.type === 'BTC' ? 'BTC Deposit' : 'GiftCard Deposit',
          payment_status:'Pending',
          payment_ref:
            new Date().getTime().toString(36) +
            Math.random().toString(36).slice(2),
        });
        // if(payment.payment_ref){
        //   User.findOne(
        //     { _id: payment?.user_id },
        //     (error, result) => {
        //       if (result) {
        //         const beforeAmt =  result.wallet;
        //         const newAmt = beforeAmt + payment.amount;
        //         result.wallet  = newAmt;
        //         result.save()
        //       } else {
        //         res.status(404).send({ msg: "User Not Found" });
        //       }
        //     }
        //   );
        // }
        payment.save();
        res.json({ payment, msg: "Payment Recieved Successfully!" });
      }
    } catch (error) {
      res.json({
        error: ["USER FIELDS NOT AVAILABLE", error.message],
      });
    }
  },

  getuserPayment: (req, res) => {
    const users = Payment.find({ user_id: req.params.id }, (err, result) => {
      if (result) {
        res.status(200).json({ result });
      }
    }).sort({payment_ref : -1});
  },
};
