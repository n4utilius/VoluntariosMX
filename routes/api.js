//controllers
var route = require('../controllers/route.js')
var passenger = require('../controllers/passenger.js')
var user = require('../controllers/user.js')

//middlewares
var mw = require ("../middlewares/index.js")
default_mw = [mw.isAuthenticated]


module.exports = function(app, passport){
	app.get('/', function(req, res, next){ res.send( {'response': true, 'msg':'connect!'} ) })
	app.get('/route', default_mw, route.all )
	
	app.post('/route', default_mw, route.insert )

	app.put('/route/application', default_mw, passenger.apply)

	app.put('/route/passenger', default_mw, passenger.add)
	app.delete('/route/passenger', default_mw, passenger.del)


	app.get('/user/routes/:user_id', default_mw, route.search_by_user )
	app.post('/route/search', route.search )

	app.post('/signup', user.signup )

	app.post('/login', mw.isUnauthenticated, user.login(passport) )

	app.get('/logout', user.logout)
}