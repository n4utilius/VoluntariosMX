// The Route model
 
var GeoJSON = require('mongoose-geojson-schema')
   , mongoose = require('mongoose')
   , Schema = mongoose.Schema

var routeSchema = mongoose.Schema({
    name: { type: String, required: true },
    path: {  
        type: { type: String }
        , coordinates: [  ] 
    },
    start_time: { type: Date, required: true },
    num_places: { type: Number, required: true },
    applications: [ Schema.ObjectId ], // ***   q
    passengers: [ Schema.ObjectId ], // [ Schema.ObjectId ]
    create_by: { type: Schema.ObjectId, required: true }
})

routeSchema.index({ path: '2dsphere' });

//new Schema({ loc: { type: [Number], index: '2dsphere'}})
module.exports = mongoose.model('Route', routeSchema);
