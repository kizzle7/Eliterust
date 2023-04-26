
var mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {type: String},
  username: {type: String, lowercase: true, unique: true},
  phone: {type: String},
  password: {type: String},
  bankDetails: {
      accountName: {type: String},
      bankName: {type: String},
      accountNo: {type: Number}
  },
  isVerified: {type: Boolean, default: false},
  isBlocked: {type: Boolean, default: false},
  isFreezed: {type: Boolean, default: false},
  withDrawalStatus: {type: Boolean, default: false},
  investmentAmt: {type: Number, default: 0},
  balanceToPay: {type:Number, default: 0},
  recievingAmt: {type:Number, default: 0},
  confirmedTimePaid: {type: Date},
  stage: {type: String, enum: ["pay", "receive", "matched"], default: "pay"},
  referralLink: {type: String},
  referredLink: {type: String},
  referrals: [{userID: {type: String}, id: {type: mongoose.SchemaTypes.ObjectId, ref: "users"}, amount: {type: Number, default: 0},
  status: {type: Boolean, default: false}}],
  payToVerify: {
      guider: {type: mongoose.SchemaTypes.ObjectId, ref: 'users'}
  },
  matchedToPay: {
      status: {type: Boolean, default:false},
      bankDetails: {type: Object, default: null},
      payID: {type: mongoose.SchemaTypes.ObjectId, ref: 'users'},
      phone: {type: String},
      countDown: {type: Date}
  },
  state: {type: Number, default: 0},
  matchedToReceive: {
      status: {type: Boolean, default: false},
      amountPaired: {type: Number, default: 0},
      users: [{id: {type: String}, _id: {type: mongoose.SchemaTypes.ObjectId, ref: "users"}, amount: {type: Number}, paid: {type: Boolean, default: false}}]
  },
  proof: [{
      status: {type: Boolean, default: false},
      description: {type: String},
      file_id: {type: String, default: ''},
      file_url: {type: String, default: ''},
      userID: {type: String}
  }],
  referralsTotalAmount: {type: Number, default: 0},
  referralBalance: {type: Number, default: 0},
  lengthPaid: {type: Number, default: 0},
  regCreatedAt: { type: Date, default: Date.now },
  role: {type: String, default: 'user'}





});

module.exports = mongoose.model("users", UserSchema);
