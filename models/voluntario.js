// Modelo 'Voluntario'
 
var mongoose = require('mongoose')
   ,Schema = mongoose.Schema

var voluntarioSchema = mongoose.Schema({
    id_perfil: { type: Schema.ObjectId, required: true },
    id_evento: { type: Schema.ObjectId, required: true },
	nombre_evento: { type: String, required: true }, 
	area:{
		nombre: { type: String }, 
		horario: { 
			nombre: { type: String },
			hora_inicio: { type: String }, // formato 12:30
			hora_fin: { type: String }, // formato 12:30
			encargado: { type: String }
		}
	},
    estatus: { type: String, default:'solicitud' }, 
	evaluacion: { type: Number }, 
	observaciones: { type: String }
})

module.exports = mongoose.model('Voluntario', voluntarioSchema);