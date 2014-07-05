var express = require('express');
var namespace = require('express-namespace');
var ibmbaas = require('ibmbaas');
var ibmdata = require('ibmdata');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var path = require('path');

var applicationId = 'e09ae593-2013-4a3e-adda-30d850c7025b';
ibmbaas.initializeSDK(applicationId);

//database config
var mongoose = require('mongoose');

if (process.env.VCAP_SERVICES) {
   var env = JSON.parse(process.env.VCAP_SERVICES);
   var mongo = env['mongodb-2.2'][0].credentials;
   console.log(process.env.VCAP_SERVICES)
} else {
   	var mongo = {
   	   "username" : "n4otest",
    	"password" : "ds041248",
      	"url" : "mongodb://localhost/voluntariosMX" // 	urldb
   	}

}
mongoose.connect(mongo.url);

// create an express app
var app = express();
app.use(express.bodyParser());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(require('stylus').middleware(path.join(__dirname, 'public')));

//add passports services
require('./config/passport.js')(passport, LocalStrategy)

//sessions
app.use(express.cookieParser());
app.use(express.session({ secret: '5Bdz0Ehu6LaravC' }));

app.use(passport.initialize());
app.use(passport.session());

app.use(app.router);

//initialize ibmconfig module
var config = require('ibmconfig');
config.initializeSDK(applicationId);

//get context root to deploy your application
var mbaasContextRoot = config.mbaasContextRoot;

// log all requests
app.all('*', function(req, res, next){
	console.log("Received request to " + req.url);
	next();
});

// create resource URIs
require('./routes')(app, passport)
require('./routes/api/v1.js')(app, passport)

// host static files in public folder
app.use(express.static(path.join(__dirname, 'public')));

app.listen(config.port);
console.log('Server started at port: '+config.port);