// Modelo 'Evento'
 
var mongoose = require('mongoose')
   ,Schema = mongoose.Schema

var eventoSchema = mongoose.Schema({	
   	nombre: { type: String, required: true },
   	tipo: { type: String, required: false },
   	logo_url: { type: String, required: false },
   	
   	lugar: { type: String, required: true },
   	fecha_inicio: { type: Date, required: true },
   	fecha_fin: { type: Date, required: true },
   	
   	url_reporte: { type: String },
   	
   	areas:[{
		   nombre: { type: String },
		   horarios: [{ 
			   nombre: { type: String },
			   hora_inicio: { type: String }, // formato 12:30
			   hora_fin: { type: String }, // formato 12:30
			   encargado: { type: String }
		   }],
   	}],
      descripcion: { type: String },
      encargado: { type: Schema.ObjectId },
      url_reporte: { type: String }
})

module.exports = mongoose.model('Evento', eventoSchema);