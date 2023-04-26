// var Users = require("../../models/main");
// var token = require("../../utils");
// // var Company = require('../../models/invest/test').Test;
// // var Games = require('../../models/invest/refer');
// var Admin = require('../../models/Admins').Admins;
// const bcrypt = require('bcryptjs');
//
// module.exports = {
//   login: (req, res) => {
//
//     try{
//       Admin.findOne({name: req.body.name}, (err, result) => {
//         if(!result){
//           res.json({success: true, message: 'Invalid Credentials', status: 400})
//         }
//         else{
//           const passwordCheck = req.body.password == result.password;
//           if(!passwordCheck){
//             res.json({success:true, message: 'invalid Credentials', status: 400});
//           }
//           else {
//             const user = {
//               name: result.name,
//               id:result._id,
//               password: result.password,
//               role: result.isAdmin,
//               token: token.getToken(result)
//             }
//             res.json({success:true, message:'Login Admin Successful', role:'user', user, status:200})
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
//   register: (req, res) => {
//     try {
//       const admin = new Admin();
//       admin.name = "Victor";
//       admin.password = "123456";
//       admin.isAdmin = true;
//       admin.save();
//       res.json({success: true, message: admin, token: token.getToken(admin), status: 200})
//
//     } catch (e) {
//       console.log(e)
//       res.json({success:false, message:e, status: 500})
//
//     }
//   },
//
//   createGuider : (req, res) => {
//     try {
//     Users.findOne({username: req.body.username}, (err, result) => {
//       if(result){
//         res.json({success: true ,message: 'Guider Exists Already', status:400});
//       }
//       else{
//       const password= 123456;
//       const guider  = new Users();
//       guider.username = req.body.username;
//       guider.name = req.body.name;
//       guider.phone = req.body.phone;
//       guider.password = password;
//       guider.bankDetails.bankName = req.body.bankName;
//       guider.bankDetails.accountName = req.body.accountName;
//       guider.bankDetails.accountNo = req.body.accountNo;
//       guider.role= "guider";
//       const guiderDetails= guider.save();
//       res.json({success: true, message: guider, status: 200})
//     }
//     })
//   }
//   catch(err){
//     console.log(err)
//     res.json({success:false, message: err, status: 500});
//   }
//
// },
//
// allGuiders: (req, res) => {
//   Users.find({role: 'guider'}, (err, result) => {
//     res.json({guiders: result})
//   })
// }
//
// }
