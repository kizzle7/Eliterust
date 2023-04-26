// const token = require("../../utils");
// // const Company = require('../../models/invest/test').Test;
// // const Games = require('../../models/invest/refer');
// const bcrypt = require('bcryptjs');
//
// module.exports = {
//   login: (req, res) => {
//
//     try{
//       Users.findOne({username: req.body.username}, (err, result) => {
//         if(!result){
//           res.json({success: true, message: 'Invalid Credentials', status: 400})
//         }
//         else{
//           const passwordCheck = bcrypt.compareSync(req.body.password, result.password);
//           if(!passwordCheck){
//             res.json({success:true, message: 'invalid Credentials', status: 400});
//           }
//           else {
//             const user = {
//               name: result.name,
//               id:result._id,
//               username: result.username,
//               phone: result.phone,
//               password: result.password,
//               role: result.role,
//               token: token.getToken(result)
//             }
//             res.json({success:true, message:'Login Successful', role:'user', user, status:200})
//           }
//         }
//       })
//
//     }
//   catch(err){
//     res.json({success:false, message: err, status:500});
//   }
//
//   },
//
// register: async (req, res) => {
//   const linkGen = token.generateLink(10)
//   try{
//     Users.findOne({username: req.body.username}, (err, result) => {
//       if(result){
//         res.json({
//           message: 'Account Already Exists', success: true, status: 400
//         })
//       }
//       else{
//         const user = new Users();
//         const totalAmt = req.body.investmentAmt * 0.5;
//         const amt = req.body.investmentAmt;
//         const profit = parseInt(totalAmt) + parseInt(amt)
//                   user.name = req.body.name;
//                   user.username = req.body.username;
//                   user.phone = req.body.phone;
//                   user.password = bcrypt.hashSync(req.body.password, 10);
//                   user.bankDetails.accountName = req.body.accountName;
//                   user.bankDetails.accountNo = req.body.accountNo;
//                   user.bankDetails.bankName = req.body.bankName;
//                   user.investmentAmt = req.body.investmentAmt;
//                   user.recievingAmt = profit;
//                   user.referralLink = linkGen;
//                   user.referredLink = req.body.link ? req.body.link : null;
//                   if(req.body.link){
//                     Users.findOne({ referralLink: req.body.link }, (err, result) => {
//                       if (err) {
//                           res.json({ success: false, message: 'This referral does not exits', status: 404 })
//                       } else {
//                         const findrandomGuider = Users.find({role: 'guider'}, (err, result) => {
//                           if(result){
//                             const random = Math.floor((Math.random() * result.length));
//                             result[random];
//                           }
//                         });
//                         findrandomGuider.then((guiderToPay) => {
//                           user.payToVerify.guider = guiderToPay[0]._id;
//                           user.referredLink = result.referralLink;
//                           user.save().then((createdUser) => {
//                             result.referrals.push({userID: createdUser._id, id:createdUser._id,amount: 0});
//                             result.save();
//                             const newUser = {
//                               name: createdUser.name,
//                               id: createdUser._id,
//                               username: createdUser.username,
//                               password: createdUser.password,
//                               phone: createdUser.phone,
//                             }
//                             Users.findOneAndUpdate({ _id: guiderToPay[0]._id }, { $push: { users: createdUser._id } }).exec(result => {
//                                      Users.findOne({ _id: createdUser._id }).populate({ path: 'payToVerify.guider', model: 'Use', select: 'bankDetails' }).then(us => {
//                                        try{
//
//                                              res.json({ success: true, message: 'User account created successfully!',user: newUser, payTo: us.payToVerify.guider, token: token.getToken(newUser), role: 'user', status: 200 })
//                                        }
//                                         catch(err ){
//                                           res.json({success:false, message:err, status:500});
//                                         }
//                                      })
//                                  })
//
//                           })
//                         })
//                     }
//
//                   })
//
//                   }
//                   else{
//                      Users.find({role: 'guider'},(err, result) => {
//                       if(err){
//                         res.json({success:false, message:err, status:500});
//                       }
//                       const random = Math.floor((Math.random() * result.length))
//                       result[random];
//                       console.log(result[random]);
//                     }).then((guiderToPay) => {
//                       console.log(guiderToPay[0].role)
//                       user.payToVerify.guider = guiderToPay[0]._id;
//                       // try{
//                       user.save().then((created) => {
//                         const newUser = {
//                               id: created._id,
//                               username: created.username,
//                               name: created.fullName,
//                               phone: created.phone,
//                               password: created.password
//                           }
//                           Users.findOneAndUpdate({ _id: guiderToPay[0]._id }, { $push: { users: created._id } }).exec(result => {
//                              Users.findOne({ _id: created._id },(err, result) => {
//                                if(err){
//                                  res.json({success: true, message:err, status: 500});
//                                }
//                                result;
//                                console.log(result)
//                              }).populate({ path: 'payToVerify.guider', model: 'Use', select: 'bankDetails' }).then(us => {
//                                      res.json({ success: true, message: 'User account created successfully!',data: newUser, payTo: us.payToVerify.guider, token:token.getToken(newUser), role: 'user', status: 200 })
//                              })
//                              // .catch(err => { res.json({ success: false, message: err, status: 500 }) })
//                          })
//
//                       })
//
//                     // catch(err){
//                     //   res.json({success:false, message:err, status:500});
//                     // }
//                     })
//
//
//                                 // res.json({
//                                 //   newUser, success: true, message: 'User Created successfully', token: token.getToken(newUser), status: 200
//                                 // })
//
//                   }
//
//       }
//     })
//
//
//   }
//   catch (error) {
//     res.json({message:error, success:false, status: 500})
//   }
//
// },
//
// profile: (req, res) => {
//   try{
//   const userID = Users.findOne({_id: req.params.id}, (err, result) => {
//     if(!result){
//       res.json({
//         message: 'User does not exist', success: true, status: 400
//       })
//     }
//     res.json({success:true, message:result, status:200})
//
//   });
// }
// catch(error){
//   res.json({success:false, message:error, status:500})
// }
//
//
// },
//
// matchedToPay :(req, res) => {
//   Users.find({_id:req.params.id}, (err, result) => {
//     if(err){
//       res.json({success:true, message:err, status:500});
//     }
//     console.log('starting here' + result)
//     const investAmt = result.investmentAmt;
//     if(result.matchedToPay || result.matchedToPay && result.stage == "pay"){
//       res.json({success:true, message: 'You have been mathed to pay', data:{...result.matchedToPay, phone:result.matchedToPay.phone, investAmt}, status: 200});
//     }
//     else{
//       Users.find({stage:'receive'},(err, result) => {
//         if(err){
//           res.json({success:true, message:err, status:500});
//         }
//         result;
//       }).sort({confirmedTimePaid: '1'}).then((recievers) => {
//         if(recievers.length === 0){
//           console.log('same here' + result.bankDetails)
//           Users.find({role: 'guider', _id: {$ne: result.payToVerify.guider}},(err, result) => {
//             if(err){
//               res.json({success:true, message:err, status:500})
//             }
//             const random = Math.floor((Math.random() * result.length));
//             const guiderToPay = result[random];
//             const matchedToPay = {
//               phone: guiderToPay.phone,
//               payID: guiderToPay._id,
//               bankDetails:guiderToPay.bankDetails,
//               status: true,
//               countDown: token.countDown(7)
//             }
//             Users.findOneAndUpdate({_id:result._id}, (err, result) => {
//               if(err){
//                 res.json({success:true, message:err, status:500})
//               }
//               result;
//             }).exec((result) => {
//               Users.findOneAndUpdate({_id: guiderToPay._id},{$push: {'matchedToReceive.users':{id:result._id, _id:result._id, amount:result.investmentAmt}}}).exec((res) => {
//                 res.json({success:true, message:matchedToPay, status:200});
//               })
//             })
//           })
//
//         }
//         else{
//           const basicrecievers = recievers.filter(payee => payee.recievingAmt >= investAmt && !payee.matchedToPay.status);
//           var userToReceive;
//           const random = token.generateRandom(basicrecievers.length);
//           if(basicrecievers.length > 0){
//             const nextreciever = basicrecievers[0];
//             const nextrecieverAmt= (nextreciever.investmentAmt - nextreceiver.matchedToReceive.amountPaired);
//             const getAmountToReceive = Users.find({_id: nextreciever._id}, (err, result) => {
//               result.referralsTotalAmount + nextrecieverAmt;
//             });
//             // nextreciever.matchedToReceive.amountPaired += investAmt;
//             // nextreciever.matchedToReceive.users.push({ id: result._id, _id: result.id,  amount: investAmt });
//             if(basicrecievers.length == 1){
//               userToReceive = nextreciever;
//             }
//             else if (nextreciever.matchedToReceive.amountPaired == 0) {
//                                     userToReceive = nextreciever;
//                                 } else if (investAmt <= nextrecieverAmt) {
//                                     userToReceive = nextreciever;
//                                 } else if (getAmountToReceive && investAmt <= getAmountToReceive) {
//                                     userToReceive = nextReceiver;
//                                 }
//                                 else {
//                                     const randomReceiver = basicrecievers[random];
//                                     const randomReceiverAmt = (randomReceiver.investmentAmt - randomReceiver.matchedToReceive.amountPaired);
//                                     const getAmountToReceiveR = Users.find({_id: randomReceiver._id}, (err, result) => {
//                                       result.referralsTotalAmount + nextrecieverAmt;
//                                     });
//                                     if (randomReceiver.matchedToReceive.amountPaired == 0) {
//                                        userToReceive = randomReceiver;
//                                    } else if (investAmt <= randomReceiverAmt) {
//                                        userToReceive = randomReceiver;
//                                    } else if (getAmountToReceiveR && investAmt <= getAmountToReceiveR) {
//                                        userToReceive = randomReceiver;
//                                    }
//                                 }
//                                 if (userToReceive == undefined) {
//                                 Users.find({role: 'guider', _id: { $ne: result.payToVerify.guider}}, (err, result) => {
//                                   const random = Math.floor((Math.random() * result.length));
//             const guiderToPay = result[random];
//             const matchedToPay = {
//                 status: true,
//                 bankDetails: guiderToPay.bankDetails,
//                 phone: guiderToPay.phone,
//                 payID: guiderToPay._id,
//                 countDown: token.countDown(7),
//             }
//             Users.findOneAndUpdate({ _id: result._id }, { matchedToPay},(err, result)=> {
//               if(err){
//                 res.json({success:true, message:err, status:500})
//               }
//             }).exec(re => {
//                Users.findOneAndUpdate({ _id: guiderToPay._id }, { $push: { 'matchedToReceive.users': { id: result._id, _id: result._id, amount: investAmt } } }).exec(res => {
//                  res.json({ success: true, message: 'You have been matched to pay', data: {matchedToPay, investAmt }, status: 200 })
//                })
//            })
//             })
//
//           }
//           else {
//                                     const returns = userToReceive.investmentAmt;
//                                     console.log({ returns })
//                                     const cd = token.countDown(7);
//                                     result.matchedToPay.bankDetails = userToReceive.bankDetails,
//                                         result.matchedToPay.countDown = cd,
//                                         result.matchedToPay.payID = userToReceive._id,
//                                         result.matchedToPay.phone = userToReceive.phone,
//                                         result.matchedToPay.status = true
//                                     userToReceive.matchedToReceive.users.push({ id: result._id, _id: result.id, _id: result._id, amount: investAmt });
//                                     userToReceive.matchedToReceive.amountPaired += investAmt;
//                                     // const stage = user.stage == 'pay' ? 'recommit' : user.stage == 'recommit' ? 'recommit' : null;
//                                     // user.stage = stage;
//                                     // user.isFreezed = stage == 'recommit' ? true : false
//                                     if ((getAmountToReceive && investAmt == (getAmountToReceive + returns)) || (getAmountToReceiveR && investAmt == (getAmountToReceiveR + returns)) || (investAmt == (nextReceiverPlan + returns)) || (investAmt == (randomReceiverPlan + returns)) || (investAmt == (nextReceiverAmt + returns)) || (investAmt == (randomReceiverAmt + returns))) {
//                                         userToReceive.withDrawalStatus = userToReceive.withDrawalStatus ? false : false;
//                                         userToReceive.referralsTotalAmount = userToReceive.withDrawalStatus ? 0 : userToReceive.withDrawalStatus;
//                                         userToReceive.stage = 'matched';
//                                         userToReceive.matchedToReceive.status = true;
//                                         result.save();
//                                         userToReceive.save();
//                                         res.json({ success: true, message: 'You have been matched to pay', data: { ...userToReceive.bankDetails, payID: userToReceive._id, phone: userToReceive.phone, plan: userToReceive.plan, userPlanAmt, countDown: cd }, status: 200 })
//                                     } else {
//                                         result.save();
//                                         userToReceive.save();
//                                         res.json({ success: true, message: 'You have been matched to pay', data: { ...userToReceive.bankDetails, payID: userToReceive._id, phone: userToReceive.phone, plan: userToReceive.plan, userPlanAmt, countDown: cd }, status: 200 })
//                                     }
//                                 }
//
//
//           }
//
//         }
//
//       })
//     }
//   })
// },
//
// users : (req, res) => {
//   const users = Users.find({}, (err, result) => {
//     if(result){
//       res.json({result})
//     }
//   }).sort({_id: -1});
//
//
// },
//
// test:  (req, res) => {
//   // const info =  new Company();
//   // info.companyName = "Bytecontrol",
//   // info.firstParty = true,
//   // info.webiste= "www.bit2naia.com"
//   //
//   // const infoSave = info.save().then((data) => {
//   //   res.json({post:data})
//   // });
//
//
// },
// test2: async (req, res) => {
//   // const func = Games.find({}, (err, result) => {
//   //   if(err){
//   //     res.json({success:true, status: 500});
//   //   }
//   //   res.json({result})
//   //   console.log(result[0])
//   //
//   // })
//
//
// }
//
//
// }
