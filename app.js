var express = require('express');
var namespace = require('express-namespace');
var ibmbaas = require('ibmbaas');
var ibmdata = require('ibmdata');
//var ibmpush = require('ibmpush');

//change this to the actual application ID of your Mobile Cloud application
var applicationId = 'yourApplicationId';
ibmbaas.initializeSDK(applicationId);

var data = ibmdata.initializeService();
//var push = ibmpush.initializeService();

// create an express app
var app = express();
app.use(express.bodyParser());
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
app.namespace(mbaasContextRoot, function() {
	    /*
	     * Create a new user with the json data contained in request body.  The content-type must be set to application/json.
	     * To make the below sample code run correctly, the json data must contain id attribute, here is the sample.
	     * {
	     *  "id":"1",
	     *  "name": "MBaaS"
	     * }
	     * 
	     * To test: curl -X POST -H "Content-Type: application/json" -d "{\"id\":\"1\", \"name\":\"MBaaS\"}" https://mobile.ng.bluemix.net/${appHostName}/v1/apps/${applicationId}/user
	     * 
	     */
		app.post('/user',function(req,res) {
			var user = data.Object.ofType("User", req.body);
			user.save().then(function(saved) {
				res.json(saved);
			});
				
		});
		
		/*
		 * Modify the user's data matched the id attribute with the put request body.
		 * 
		 * To test: curl -X PUT -H "Content-Type: application/json" -d "{\"id\":\"1\", \"name\":\"MBaaS\"}" https://mobile.ng.bluemix.net/${appHostName}/v1/apps/${applicationId}/user
		 * 
		 */
		app.put('/user',function(req,res) {		
			var query = data.Query.ofType("User");
			query.find({id: req.body.id}, {limit: 1}).then(function(user) {
				user.forEach(function(person){
					person.set(req.body);
					person.save().then(function(updated) {
						res.json(updated);
					});
				});
			});
		});
		
		/*
		 * List all users data stored by IBM Data Service.
		 * 
		 * To test: curl https://mobile.ng.bluemix.net/${appHostName}/v1/apps/${applicationId}/users
		 * 
		 */
		app.get('/users',function(req,res) {
			var query = data.Query.ofType("User");
			query.find().done(function(users) {
				res.json(users);
			});
		});
		
		/*
		 * Find the user's data for the given parameter. The sample code below filters user data by the id attribtue. It can be filtered by other attribute set. 
		 * Take the name attribute as an example, it can be filtered by name attribute by using api 'query.find({name: 'MBaaS'})'.
		 * 
		 * To test: curl https://mobile.ng.bluemix.net/${appHostName}/v1/apps/${applicationId}/user/1
		 * 
		 */
		app.get('/user/:id',function(req,res) {
			var query = data.Query.ofType("User");
			query.find({id: req.params.id}, {limit: 1}).done(function(user) {
				if (user.length==1) {
					res.json(user);
				}
				else {
					res.status(404);
					res.send("No such user found");
				}
			});
		});

		/*
		 * Delete the user's data for the given parameter. Below shows how to delete the user data by the id attribtue. 
		 * It can be also deleted by other attribute like name by changing query.find option.
		 * 
		 * To test: curl -X DELETE https://mobile.ng.bluemix.net/${appHostName}/v1/apps/${applicationId}/user/1
		 * 
		 */
		app.delete('/user/:id',function(req,res) {
			var query = data.Query.ofType("User");
			query.find({id: req.params.id}, {limit: 1}).done(function(users) {
				if (users.length==1) {
					users[0].del().done(function(deleted) {
						var isDeleted = deleted.isDeleted();
						if (deleted.isDeleted()) {
							res.send("delete successfully.");
						}
						else {
							res.status(500);
							res.send("delete failed.");
						}
					});
				}
				else {
					res.status(404);
					res.send("No such user found");
				}
			});
		});
	
});

// host static files in public folder
// URL:  https://mobile.ng.bluemix.net/${appHostName}/v1/apps/${applicationId}/public/
//app.use(mbaasContextRoot+'/public',express.directory('public'));
app.use(mbaasContextRoot+'/public',express.static('public'));


//Redirect to the Extending Node.js to use Mobile Cloud Services applications page when accessing the root context
app.get('/', function(req, res){
	res.redirect('https://www.ng.bluemix.net/docs/MobileCloud.jsp');
});

app.listen(config.port);
console.log('Server started at port: '+config.port);