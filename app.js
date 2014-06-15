var express = require('express');
var namespace = require('express-namespace');
var ibmbaas = require('ibmbaas');
var ibmdata = require('ibmdata');
//var cache = require('./routes/cache')
var ibmpush = require('ibmpush');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
	
//change this to the actual application ID of your Mobile Cloud application
var applicationId = '937029d7-ad38-4431-89c1-6b977c5d76bd';
ibmbaas.initializeSDK(applicationId);

var data = ibmdata.initializeService();
//var push = ibmpush.initializeService();

var mongoose = require('mongoose');
var urldb = "mongodb://localhost/n4otest";
var urldb = "mongodb://n4otest:12345@ds041248.mongolab.com:41248/ibm_a_traer";
mongoose.connect(urldb);

// create an express app
var app = express();
app.use(express.bodyParser());

//add passports services
require('./config/passport.js')(passport, LocalStrategy)

app.use(express.cookieParser());
app.use(express.session({ secret: '--- OMMITTED ---' }));

app.use(passport.initialize());
app.use(passport.session());

app.use(app.router);


//initialize ibmconfig module
var config = require('ibmconfig');
config.initializeSDK(applicationId);

//get context root to deploy your application
//the context root is '${appHostName}/v1/apps/${applicationId}'
var mbaasContextRoot = config.mbaasContextRoot;


// log all requests
app.all('*', function(req, res, next){
	console.log("Received request to " + req.url);
	next();
});


// create resource URIs

var route = require('./controllers/route.js')
var passenger = require('./controllers/passenger.js')
var user = require('./controllers/user.js')
var middlewares = require ("./middlewares/base.js")

defaultMiddlewares = [middlewares.isAuthenticated]

app.namespace(mbaasContextRoot, function() {
	app.post('/route', defaultMiddlewares, route.insert )
	app.get('/route', defaultMiddlewares, route.all )

	app.put('/route/application', defaultMiddlewares, passenger.apply)

	app.put('/route/passenger', defaultMiddlewares, passenger.add)
	app.delete('/route/passenger', defaultMiddlewares, passenger.del)


	app.get('/user/routes/:user_id', defaultMiddlewares, route.search_by_user )
	//app.get('/user/routes/search', route.search )

	app.post('/signup', user.signup )

	app.post('/login', function(req, res, next) {
	  passport.authenticate('local', function(err, user, info) {
	    if (err) { return next(err); }
	    if (!user) { 
	    	return res.send({ 'success': false, 'msg': 'email o password incorrecto'}); 
	    }
	    //console.log(user)
	    req.login(user, function(err) {
	      if (err) {  return res.send({ 'success': false, 'msg': err.message })}
	      return res.send({ 'success': true, 'msg': 'ok'}); 
	    });
	  })(req, res, next);

	});

	app.get('/logout', user.logout)
	
	
})


// host static files in public folder
// URL:  https://mobile.ng.bluemix.net/${appHostName}/v1/apps/${applicationId}/public/
//app.use(mbaasContextRoot+'/public',express.directory('public'));
app.use(mbaasContextRoot+'/public',express.static('public'));


//Redirect to the Extending Node.js to use Mobile Cloud Services applications page when accessing the root context

app.listen(config.port);
console.log('Server started at port: '+config.port);