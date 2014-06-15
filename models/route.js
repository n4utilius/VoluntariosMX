// The Route model
 
var mongoose = require('mongoose')
   ,Schema = mongoose.Schema

var routeSchema = mongoose.Schema({
    name: String, 
    path: [ { lat: Number, lon: Number } ],
    start_time: Date,
    num_places: Number,
    applications: [ Schema.ObjectId ], // ***
    passengers: [ Schema.ObjectId ], // [ Schema.ObjectId ]
    create_by: Schema.ObjectId
})

module.exports = mongoose.model('Route', routeSchema);
