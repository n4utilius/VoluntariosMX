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
		/*
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
		*/
	}

	if (error)
		return callback([], error);

	route.path = { type : "LineString" , coordinates : route.path }
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

/* Pendiente, se tiene que hacer con rangos*/
route.search = function(req, res){
	coordinate = req.body.coordinate
	start_time = req.body.start_time
	end_time = req.body.end_time
	
	var result = { 'success': false, 'msg':'', 'data':[]}

	max = 1 / 6378; // max distance in km / earth's radius in km gives us radians
	Route.find({ 
		start_time: {"$gte": start_time, "$lt": end_time },
		path: { 
			$nearSphere:  coordinate || [ 2, 2 ],
			$maxDistance : max,
			spherical : true
		}
	}, function (error, data) {
	        if (error) return res.send(error.message);
	        else{
	        	result.success = true
	        	result.msg = 'ok'
	        	result.data = data
	        	res.send(result)
	        }
      	}
    )



}

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