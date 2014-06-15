//var passport = require('passport');
var User = require('../models/user.js');

module.exports = function(passport, LocalStrategy){ 
	passport.serializeUser(function(user, done) {
	  done(null, user.id);
	});
	 
	passport.deserializeUser(function(id, done) {
	  User.findById(id, function(err, user){
	      done(err, user)
	  })
	});

	passport.use(new LocalStrategy({usernameField: 'email'}, function(email, password, done) {
	  process.nextTick(function() {
	    User.findOne({ 'email': email}, function(err, user) {
		    if (err) { return done(err);}
		    if (!user) { return done(null, false); }

		    user.comparePassword(password, function(err, isMatch) {
				if (isMatch) {
				    return done(null, user);
				}
				console.log("Contraseña invalida")
				return done(null, false, {  message: "Contraseña invalida" });
			});
	      //return done(null, user);
	    });
	  });
	}));
}
