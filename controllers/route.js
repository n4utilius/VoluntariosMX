var Profile = require('../models/profile.js');
var Route = require('../models/route.js');

var route = {};
var private = {};

//req.user['_id']

private.route_validate = function(route, callback){
	var params = ['name', 'path', 'start_time', 'num_places', 'create_by']; 
	var error = false
	for (i in params){
		if ( route[params[i]] == undefined ) 
			error = 'hace falta esfecificar ' + params[i];

		if ( params[i] == 'path' && route[params[i]] != undefined){
			route.path = JSON.parse(route.path);
			for (i in route['path']){
				if(route['path'][i]){
					if ( route['path'][i].lat == undefined || route['path'][i].lon == undefined )
						error = "tu path debe de tener un formato [ {lat:'', lon: ''}, {lat:'', lon: ''} ...]";
				}else{
					console.log("no hay paths")
				}
			}
			
		}
	}

	if (error)
		return callback([], error);
		
	return callback(route, error);

}

private.query_validate = function(query, callback){
	if( query.date_in == undefined || query.cerca_de == undefined ){ //corregir 'cerca_de'
		error = "tu query debe de tener un formato {date_in:{ start:'', end: ''}, cerca_de: {lat:'', lon:''} } "; //corregir 'cerca_de'
	}else{
		if (query.date_in.start == undefined || query.date_in.end == undefined){
			error = "tu query debe de tener un formato {date_in:{ start:'', end: ''}, cerca_de: {lat:'', lon:''} } "; //corregir 'cerca_de'
		}
		if (query.cerca_de.lat == undefined || query.cerca_de.lon == undefined){ //corregir 'cerca_de'
			error = "tu query debe de tener un formato {date_in:{ start:'', end: ''}, cerca_de: {lat:'', lon:''} } "; //corregir 'cerca_de'
		}
	}
	if (error)
		return callback('', error);

	return callback(query, false);
}

route.insert = function(req, res){
	var result = { 'success': false, 'msg': ''}
	req.body.create_by = req.user['_id']
	private.route_validate(req.body, function(data, error){
		if (error){
			result.msg = error.message;
			res.send(result)
		}else{
			my_route = new Route(data)
			
			my_route.save(function(error, data){
				if(error){
					result.msg = error.message;
					res.send(result)
				}else{
					result.success = true;
					result.msg = 'ok';
					res.send(result)
				}
			})
			
		}
	})
}

/* Pendiente, se tiene que hacer con rangos
route.search = function(query){
	var res = { 'success': false, 'msg'; '', 'data':[]}

	private.query_validate(query ,function(query, error){
		if (error)
			res.msg = error
			return res;

		Route.find(query, function(data, error){
			if (error) {
				res.msg = error;
				return res;
			}
			res = { 'success': true, 'msg':'ok', 'data' : data }
			return res
		})
	})
}
*/

route.search_by_user = function(req, res){
	var user_id = req.params.user_id 
	var result = { 'success': false, 'msg': '', 'data':[]}

	if ( user_id == false){
		result.msg = 'Debe enviarse un user_id'
		res.send(result);
	}

	Route.find({'create_by': user_id }, function(error, data){
		if (error) {
			result.msg = error.message;
			res.send(result);
		}
		result = { 'success': true, 'msg':'ok', 'data' : data }
		res.send(result)
	})
}

route.all = function(req, res){
	var result = { 'success': false, 'msg': '', 'data':[]}
	Route.find({}, function(error, data){
		if (error) {
			result.msg = error.message
			res.send(result);
		}
		result = { 'success': true, 'msg':'ok', 'data' : data }
		res.send(result);
	})
}

module.exports = route;