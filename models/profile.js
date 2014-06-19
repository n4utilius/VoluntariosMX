// The Profile model
 
var mongoose = require('mongoose')
   ,Schema = mongoose.Schema

var profileSchema = mongoose.Schema({
    user_id: { type: Schema.ObjectId, required: true },
    name: { type: String, required: true }, 
    alias: String, 
    cargo: String, // ***
    tel: String,
    bio: String,
    img: String,
})

module.exports = mongoose.model('Profile', profileSchema);