var murl = '../../../models/';
var User = require(murl + 'user.js');
var public = {};

public.signup = function(req, res){
	var email = req.body.email 
	var password = req.body.password 
	
	var result = { 'success': false, 'msg': ''}

	if ( email == undefined || password == undefined  ){
		result.msg = 'Debe enviarse un email y un password'
		return res.send(result);
	}
	
	var my_user = new User(req.body);
	
	my_user.save(function(error, data){
		if(error){
			result.msg = error.message;
			return res.send(result)
		}else{
			result.success = true;
			result.msg = 'ok';
			res.send(result)
		}
	})
			
}

public.login = function(passport){
	return function(req, res, next) {
	 	passport.authenticate('local', function(err, user, info) {
	    	if (err) { return next(err); }
	    	if (!user) { 
	    		return res.send({ 'success': false, 'msg': 'email o password incorrecto'}); 
	    	}
	    	req.login(user, function(err) {
	      		if (err) {  return res.send({ 'success': false, 'msg': err.message })}
	      		return res.send({ 'success': true, 'msg': 'ok'}); 
	    	})
	  	})(req, res, next)
	}
}


public.logout = function(req, res){
	req.logout();
	res.send({ 'success': true, 'msg': 'ok'}); 
}

module.exports = public;

