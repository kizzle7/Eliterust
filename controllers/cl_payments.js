var Payment = require("../models/payment");
var User = require("../models/user");
var Transactions = require("../models/transactions");
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
          gitcard_img:req.body.cardImage,
          btc_address: req.body.btcAddress,
          btc_rate_value: req.body.valueRate,
          user_id: req.body.id,
          payment_type:
            req.body.type === "BTC" ? "BTC Deposit" : "GiftCard Deposit",
          payment_status: "Pending",
          payment_ref:
            new Date().getTime().toString(36) +
            Math.random().toString(36).slice(2),
        });

        const trans = new Transactions({
          amount: req.body.amount,
          trans_type: "Funding",
          user_id: req.body.id,
          payment_ref: payment.payment_ref,
          txn_type : 'Pending Credit',
          trans_status: "Pending",
          trans_type_mode:
            req.body.type === "BTC" ? "BTC Deposit" : "GiftCard Deposit",
          trans_ref:
            new Date().getTime().toString(36) +
            Math.random().toString(36).slice(2),
        });

        payment.save();
        trans.save();
        res.json({ payment, msg: "Payment Recieved Successfully!" });
      }
    } catch (error) {
      res.json({
        error: ["USER FIELDS NOT AVAILABLE", error.message],
      });
    }
  },

  getuserPayment: (req, res) => {
    try {
      const trans = Transactions.find(
        { user_id: req.params.id },
        (err, result) => {
          if (result) {
            res.status(200).json({ result });
          }
        }
      ).sort({ payment_ref: -1 });
    } catch (error) {
      console.log(error.message);
    }
  },

  confirmPayment: (req, res) => {
    Payment.findOne({ payment_ref: req.params.id }, (err, result) => {
      if (result) {
        User.findOne({ _id: result.user_id }, (err, res) => {
          if (res) {
            res.wallet = res.wallet + result.amount;
            res.save();
          }
        });
        result.payment_status = "Completed";
        Transactions.findOne({ payment_ref: req.params.id }, (er, rs) => {
          rs.trans_status = "Completed";
          rs.txn_type = 'Credit'
          rs.save();
        });
        result.save();
        res.status(200).json({ payment_details: result });
      }
    });
  },

  getuserPaymentInfo: (req, res) => {
    Payment.findOne({ payment_ref: req.params.id }, (err, result) => {
      if (result) {
        res.status(200).json({ payment_details: result });
      }
    });
  },

  adminTrans: (req, res) => {
    const products = Transactions.find({}, (err, result) => {
      if (result) {
        res.status(200).json({
          transactions: result,
        });
      } else {
        res.json({
          error: err,
        });
      }
    }).sort({ _id: -1 });
  },
};
