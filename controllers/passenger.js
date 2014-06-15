var Profile = require('../models/profile.js');
var Route = require('../models/route.js');

var passenger = {};

passenger.apply = function(req, res){
	var user_id = req.user['_id']

	var route_id = req.body.route_id 
	var result = { 'success': false, 'msg': ''}

	if ( user_id == undefined || route_id == undefined  ){
		result.msg = 'Debe enviarse un user_id y un route_id'
		return res.send(result);
	}

	Route.findById(route_id, function(error, data){
		if(error){
			result.msg = error.message
			res.send(result)
		}else{
			if (!data){
				result.msg = "ruta no encontrada"
				return res.send(result);
			}

			if(user_id == data.create_by){
				result.msg = "no puedes solicitar a tu propia ruta"
				return res.send(result);
			}

			if ( data.applications.indexOf(user_id) > -1){
				result.msg = "ya aplicaste a esta ruta"
				return res.send(result);
			}

			if ( data.passengers.indexOf(user_id) > -1){
				result.msg = "ya fuiste aceptado en esta ruta"
				return res.send(result);
			}

			data.applications.push(user_id)
			data.save(function(error, data){
				if(error){
					result.msg = error.message
					res.send(result)
				}else{
					result.msg = "ok"
					result.success = true
					res.send(result)
				}
			})
			
			
		}

	})
}

passenger.add = function(req, res){
	var user_id = req.body.user_id 
	var route_id = req.body.route_id 

	var owner_id = req.user['_id']

	var result = { 'success': false, 'msg': '', 'data': user_id}

	if ( user_id == undefined || route_id == undefined  ){
		result.msg = 'Debe enviarse un user_id y un route_id'
		return res.send(result);
	}

	if (owner_id == user_id){
		result.msg = 'No puedes agregarte a tu propia ruta'
		return res.send(result);
	}

	Route.findById(route_id, function(error, data){
		if(error){
			result.msg = error.message
			res.send(result)
		}else{
			if (!data){
				result.msg = 'ruta no encontrada'
				return res.send(result);
			}

			if ( toString(owner_id) != toString(data.create_by) ){
				result.msg = 'No puedes agregar a alguien a una ruta que no creaste'
				return res.send(result);
			}

			//add to passengers
			if (data.passengers.indexOf(user_id) > -1){
				result.msg = 'Este usuario ya ha sido agregado a los pasajeros'
				return res.send(result);
			}

			data.passengers.push(user_id)
			//del of applications
			idx = data.applications.indexOf(user_id)
			if (idx > -1) data.applications.splice(idx, 1);

			data.save(function(error, data){
				if(error){
					result.msg = error.message
					res.send(result)
				}else{
					result.msg = "ok"
					result.success = true
					res.send(result)
				}
			})
			
			
		}

	})

}

passenger.del = function(req, res){
	var user_id = req.body.user_id 
	var route_id = req.body.route_id

	var owner_id = req.user['_id']

	var result = { 'success': false, 'msg': ''}

	if ( user_id == undefined || route_id == undefined  ){
		result.msg = 'Debe enviarse un user_id y un route_id'
		res.send(result);
	}

	Route.findById(route_id, function(error, data){
		if(error){
			result.msg = error.message
			res.send(result)
		}else{
			if (!data){
				result.msg = 'ruta no encontrada'
				return res.send(result);
			}

			if ( toString(owner_id) != toString(data.create_by) ){
				result.msg = 'No puedes eliminar a alguien a una ruta que no creaste'
				return res.send(result);
			}

			idx = data.passengers.indexOf(user_id)
			if (idx > -1) data.passengers.splice(idx, 1);

			data.save(function(error, data){
				if(error){
					result.msg = error.message
					res.send(result)
				}else{
					result.msg = "ok"
					result.success = true
					res.send(result)
				}
			})
			
			
		}

	})
}

module.exports = passenger;