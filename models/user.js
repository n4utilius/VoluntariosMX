// The User model
 
var mongoose = require('mongoose')
   ,Schema = mongoose.Schema
   ,bcrypt = require('bcrypt');

SALT_WORK_FACTOR = 10;

var userSchema = mongoose.Schema({
    email: {
	    type: String, 
      match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,  //validacion de correo
	    required: true,
	    index: { unique: true }
  	},
   	password: { type: String, required: true },
  	status: { type: String, "default": 'user' },
  	isAdmin: { type: Boolean, "default": false }
})

userSchema.pre('save', function(next) {
  var user;
  user = this;
  if (!user.isModified('password')) {
    next();
  }
  return bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    return bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) {
        next(err);
      }
      user.password = hash;
      return next();
    });
  });
});

userSchema.methods.comparePassword = function(candidatePassword, callback) {
  return bcrypt.compare(candidatePassword, this.password, function(error, isMatch) {
    if (error) { return callback(error)}
    return callback(null, isMatch);
  });
};

module.exports = mongoose.model('User', userSchema);

