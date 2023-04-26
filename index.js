var express = require('express')
var http = require('http')
const PORT = process.env.PORT || 5001;

var config =  require('./serverExpress/config')
var appServer =  express();
const cors = require('cors');
global.__basedir = __dirname;

appServer = config(appServer)
const server =  http.createServer(appServer);

server.listen(PORT, (err) => {
    if (!err) {
        console.log('Server port started at : 5001')
    }

})
