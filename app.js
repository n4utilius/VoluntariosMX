var express = require('express');
var namespace = require('express-namespace');
var ibmbaas = require('ibmbaas');
var ibmdata = require('ibmdata');
var ibmpush = require('ibmpush');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
	
var applicationId = 'e09ae593-2013-4a3e-adda-30d850c7025b';
ibmbaas.initializeSDK(applicationId);

var data = ibmdata.initializeService();
//var push = ibmpush.initializeService();

//database config
var mongoose = require('mongoose');

if (process.env.VCAP_SERVICES) {
   var env = JSON.parse(process.env.VCAP_SERVICES);
   var mongo = env['mongodb-2.2'][0].credentials;
} else {
   var mongo = {
      "username" : "n4otest",
      "password" : "ds041248",
      "url" : "mongodb://n4otest:12345@ds041248.mongolab.com:41248/ibm_a_traer"
   }

}

console.log(process.env.VCAP_SERVICES)


			
var urldb = "mongodb://ced08b03-9e64-44cd-b1b4-2dcbd54746fe:aa69bbb9-ce41-4f2f-be40-377ec8ed07b5@23.246.199.110:10023/db"; //produccion
var urldb = "mongodb://localhost/n4otest"; //local
var urldb = "mongodb://n4otest:12345@ds041248.mongolab.com:41248/ibm_a_traer"; //dev
mongoose.connect(urldb);

// create an express app
var app = express();
app.use(express.bodyParser());

/* 
	var methods = require('express/node_modules/methods');

	methods.forEach(function(method) {
	  var orig;
	  orig = app[method];
	  return app[method] = function(path, handler) {
	    console.log("patched method ", method, " ", path, " ", handler.toString());
	    return orig.apply(this, arguments);
	  };
	});
 */

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
app.namespace(mbaasContextRoot, function() {
	require('./routes/api.js')(app, passport)
})

// host static files in public folder
app.use(mbaasContextRoot+'/public',express.static('public'));

app.listen(config.port);
console.log('Server started at port: '+config.port);