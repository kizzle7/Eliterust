var express = require("express");
var products = require("../controllers/products");
var admin = require("../controllers/admin");
var user = require("../controllers/user");
var category = require("../controllers/category");
var router = express.Router();
var order = require("../controllers/order");
var payment = require("../controllers/cl_payments");
var plans = require("../controllers/invest-plans");
var invests = require("../controllers/invest");
var footy = require("../controllers/footy");
var categoryCombo = require("../controllers/categroryCombo");
const controllerFiles = require("../controllers/filecontroler");
const tilio = require("../controllers/smspro/index");
// var CronJob = require("cron").CronJob;

const api_auth = require("../controllers/invest/auth");
const api_admin = require("../controllers/invest/adminservice");
var Auth = require("../controllers/Auth");
var AuthUser = require("../utils");
const multer = require("multer");
var cron = require("node-cron");
const { users } = require("../controllers/Auth");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};


// var cronJob1 = new CronJob({
//   cronTime: "00 00 00 * * * ",
//   onTick: function () {
//     //Your code that is to be executed on every midnight
//   },
//   start: true,
//   runOnInit: false,
// });

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

module.exports = (app) => {
  router.get("/api/products", products.allProducts);
  router.get("/api/product/:id", products.singleProduct);

  router.get("/api/category/:id", category.category);
  router.get("/api/price/:id", category.price);
  router.get("/api/categoryPrice", categoryCombo.categoryCombo);

  router.post("/api/order", order.create);
  router.get("/api/order", order.orders);
  router.put("/api/order_edit/:id", order.edit);
  router.delete("/api/order_delete/:id", order.delete);
  router.get("/api/order/:id", order.singleOrder);

  // router.get('/api/deliveries',AuthUser.isAuth, delivery.all,  );
  // router.put('/api/confirm/:id', AuthUser.isAuth , delivery.confirm);
  // router.delete('/api/delivery/:id',  AuthUser.isAuth,delivery.delete );

  router.post("/api/login", Auth.login);
  router.post("/api/register", Auth.register);
  router.get("/api/user/:id", AuthUser.isAuth, user.getUser);
  router.post("/api/makepayment", AuthUser.isAuth, payment.makePayment);
  router.post(
    "/api/makeinvestment",
    AuthUser.isAuth,
    invests.createInvestementt
  );

  router.get("/api/getpayment/:id", AuthUser.isAuth, payment.getuserPayment);
  router.get("/api/getinvestments/:id", AuthUser.isAuth, invests.getInvestment);
  router.get(
    "/api/updateinvestment/:id",
    AuthUser.isAuth,
    invests.updateInvestment
  );
  router.get(
    "/api/initiateWatcher/:id",
    invests.initiateWatcher
  );
  router.get("/api/get-all-users", AuthUser.isAuth, user.getUsersList);
  router.put("/api/user/:id", AuthUser.isAuth, user.edit);
  router.put("/api/user/acc/:id", AuthUser.isAuth, user.editAcc);
  router.put("/api/user/kyc/:id", AuthUser.isAuth, user.editKyc);

  router.post("/api/movetoWallet", AuthUser.isAuth, invests.updateWallet);
  router.get("/api/getplans", AuthUser.isAuth, plans.getPlans);
  router.post("/api/plan", AuthUser.isAuth, plans.createPlan);
  router.delete("/api/plan/:id", AuthUser.isAuth, plans.delete);
  router.put("/api/plan/:id", AuthUser.isAuth, plans.edit);
  router.post("/api/btcPrice", AuthUser.isAuth, invests.getBtcPrice);
  router.get("/api/admin/transactions", AuthUser.isAuth, payment.adminTrans);
  router.get("/api/users", Auth.users);
  router.post("/api/login/admin", Auth.loginAdmin);
  router.get("/api/getpayments/:id", payment.getuserPaymentInfo);
  router.get("/api/confirmUserPay/:id", payment.confirmPayment);
  
  router.post(
    "/api/admin/create",
    upload.single("image"),
    AuthUser.isAuth,
    admin.create
  );
  router.put("/api/admin/:id", AuthUser.isAuth, admin.edit);
  router.delete("/api/admin/:id", AuthUser.isAuth, admin.delete);
  router.post("/api/v1/sms", tilio.sms);
  router.post("/api/v1/email", tilio.email);

  // router.post('/api/v1/login', footy.login)
  // router.post('/api/v1/register', footy.register);
  // router.post('/api/v1/country',upload.single('image'), AuthUser.isAuth,footy.addCountry);
  // router.get('/api/v1/country', footy.getCountry);
  // router.get('/api/v1/club', footy.getClub);
  // router.get('/api/v1/category', footy.getCat);
  // router.get('/api/v1/player', footy.getPlayer);
  // router.post('/api/v1/club/:id', upload.single('image'), AuthUser.isAuth, footy.addClub);
  // router.post('/api/v1/player/:id', upload.single('image'), AuthUser.isAuth, footy.addPng);
  // router.post('/api/v1/category', upload.single('image'), AuthUser.isAuth, footy.addCategory);
  // router.post('/api/v1/render',  AuthUser.isAuth, footy.addRender);
  // router.get('/api/v1/render',  footy.getRender);
  // router.post('/api/v1/searched',  footy.getSearched);
  // router.post('/api/v1/searched/:id',  footy.search);
  // router.get('/api/v1/clubPlayers/:id',  footy.clubPlayers);
  // router.put('/api/v1/playeredit/:id',  AuthUser.isAuth,   footy.edit);
  // router.delete('/api/v1/playerdelete/:id',  footy.delete);
  //
  // router.put('/api/v1/countryedit/:id',  upload.single('image'), AuthUser.isAuth,   footy.Conedit);
  // router.delete('/api/v1/countrydelete/:id',  footy.Condelete);
  //
  // router.put('/api/v1/clubedit/:id',  AuthUser.isAuth,  footy.Cedit);
  // router.delete('/api/v1/clubdelete/:id',   footy.Cdelete);
  // router.delete('/api/v1/categorydelete/:id',  footy.Catdelete);
  // router.get('/api/v1/league/:id',  footy.singleLig);
  //
  //
  //
  // router.get('/api/v1/clubData/:id',  footy.singleClub);
  // router.get('/api/v1/pngData/:id',  footy.singlePng);
  // router.get('/api/v1/countryData/:id',  footy.singleCont);
  //
  //
  //
  // router.get("/api/v1/files", controllerFiles.getListFiles);
  // router.get("/api/v1/files/:name", controllerFiles.download);
  //
  //
  //
  //
  // router.post('/api/v1/upload',upload.single('image'), footy.upload);
  // router.get('/api/v1/get/:id', footy.getAll);
  // router.get('/api/v1/getPlayers/:id', footy.getAllPlayer)
  //
  // router.delete('/api/v1/del/:id', footy.delete)

  // router.get('/api/v1/users', footy.users);
  // router.post('/api/v1/admin_login', footy.login);
  // router.post('/api/v1/admin_register', footy.register);
  // router.post('/api/v1/admin_register', api_admin.register);
  // router.get('/api/v1/matchedToPay/:id', api_auth.matchedToPay);
  // router.post('/api/v1/guider', api_admin.createGuider);
  //
  //
  // router.get('/api/v1/guiders', api_admin.allGuiders);

  app.use(router);
};
