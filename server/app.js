// Get the packages we need
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

// Connect to the MongoDB
mongoose.connect('mongodb://localhost:27017/netflix');

// Create Express application
var app = module.exports = express();

var NODE_ENV = 'development';
//Set Variables
app.set('env', process.env.NODE_ENV || 'production');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(function (req, res, next) {    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://192.168.12.201:4200');    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);    // Pass to next layer of middleware
    next();
  });
app.use(bodyParser.json());

routes = require('./routes/route')
app.use('/api', routes);





// Use environment defined port or 3000
var port = process.env.PORT || 2000;

// Start the server
app.listen(port);
console.log('Insert getat on port ' + port);