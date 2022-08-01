global.express = require('express')
var https = require('https');
var http = require('http');
var socket = require('socket.io');
var app = express();

var port = process.env.PORT || 8585;

process.env.NODE_ENV = process.env.NODE_ENV || 'development'; // check the environment


global.config = require('./config/config'); //all the configurations
global.appFun = require('./app/app_function');
global.globalJs = require('./config/global'); // global variables
global.mail = require('./app/email/sendMail');
const server = http.Server(app);
const io = socket(server);// all the socket connection

require('./middleware/express')(app); //

server.listen(port, function() {
	console.log('app running ', port)
});
