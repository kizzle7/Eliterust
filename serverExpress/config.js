var path = require("path");
var routes = require("./routes");
var bodyParser = require("body-parser");
var request = require("request");
var _ = require("underscore");
var cors = require("cors");
var express = require("express");
var mongoose = require("mongoose");
const { MongoClient, ServerApiVersion } = require("mongodb");
var bodyParser = require("body-parser");
var configMongo = require("../config");
module.exports = (app) => {
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(express.static("public"));
  app.use(express.static(path.join(__dirname, "/public")));
  app.use(cors());

  //   const uri =
  //     "mongodb+srv://otizontezia1778:pSjGtRIb6lKJ1aUy@otscluster.7qlds67.mongodb.net/?retryWrites=true&w=majority";
  //   const client = new MongoClient(uri, {
  //     useNewUrlParser: true,
  //     useUnifiedTopology: true,
  //     serverApi: ServerApiVersion.v1,
  //   });
  //   client.connect((err) => {
  //     const collection = client.db("elite_trust").collection("users");
  //     console.log(collection);
  //     // perform actions on the collection object
  //     client.close();
  //   });

  // mongoose.connect("mongodb+srv://otizontezia1778:pSjGtRIb6lKJ1aUy@otscluster.7qlds67.mongodb.net/elite_trust?retryWrites=true&w=majority", {
  //   useUnifiedTopology: true,
  //   useNewUrlParser: true
  // }, (err) => {
  //   if(err){
  //     throw err;
  //   }
  //   console.log('Database is started')

  // });

  mongoose.connect(
    "mongodb+srv://alarconkelly38:4marketDaysP2023@cluster0.u4dwhay.mongodb.net/?retryWrites=true&w=majority",
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    },
    (err) => {
      if (err) {
        throw err;
      }
      console.log("Database is started");
    }
  );

  routes(app);
  return app;
};
