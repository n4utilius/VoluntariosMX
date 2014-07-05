//controllers
var curl = '../../controllers/api/v1/';

var user = require(curl + 'user.js')
var perfil = require(curl + 'perfil.js')
var evento = require(curl + 'evento.js')
var voluntario = require(curl + 'voluntario.js')

//middlewares
var mw = require ("../../middlewares/index.js")
default_mw = [mw.isAuthenticated]


module.exports = function(app, passport){
	app.namespace('/api/v1', function() {
		app.get('/', function(req, res, next){ 
			res.send( {'response': true, 'msg':'connect!'} ) 
		})

		/* user */
		app.post('/signup', user.signup )
		app.post('/login', mw.isUnauthenticated, user.login(passport) )
		app.get('/logout', user.logout)
		//app.delete('/unsubscribe', user.delete)

		/* eventos */
		app.post('/evento', evento.crear )
		app.put('/evento', evento.actualizar )
		app.patch('/evento/area', evento.agregar_area )
		app.get('/evento', evento.mostrar )

		app.put('/evento/admin', evento.administrar )

		/* perfil */
		app.post('/usuario', perfil.crear )
		app.put('/usuario', perfil.actualizar )
		app.get('/usuario', perfil.mostrar )

		app.patch('/usuario/nota', perfil.agregar_nota )
		app.patch('/usuario/observacion', perfil.agregar_observacion )

		/* voluntario */
		app.post('/voluntario', voluntario.crear )
		app.put('/voluntario/area', voluntario.asignar_area )

		app.get('/voluntario', voluntario.mostrar )

		app.patch('/voluntario/estatus', voluntario.actualizar_estatus )
		app.patch('/voluntario/evaluacion', voluntario.evaluar )



	})
}
