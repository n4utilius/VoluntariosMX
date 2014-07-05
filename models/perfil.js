// Modelo 'Pelfil'
 
var mongoose = require('mongoose')
   ,Schema = mongoose.Schema

var perfilSchema = mongoose.Schema({
    user_id: { type: Schema.ObjectId, required: true },

    nombre: { type: String }, 
    alias: { type: String }, 

    direccion: { type: String }, 
    fecha_nacimiento: { type: String }, 
    telefono: { type: String }, 
    twitter: { type: String }, 

    profesion: { type: String }, 
    biografia: { type: String }, 

    notas: [{ type: String }], 
    observaciones: [{ type: String }]
})

module.exports = mongoose.model('Perfil', perfilSchema);