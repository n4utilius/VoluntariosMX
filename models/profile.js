// The Profile model
 
var mongoose = require('mongoose')
   ,Schema = mongoose.Schema

var profileSchema = mongoose.Schema({
    name: String, 
    alias: String, 
    cargo: String, // ***
    tel: String,
    bio: String,
    img: String,
    user: Schema.ObjectId
})

module.exports = mongoose.model('Profile', profileSchema);