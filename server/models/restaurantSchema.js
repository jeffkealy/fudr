var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// Create the Schema
var restaurantSchema = new Schema({

  name: {type: String, required: true, unique: true},
  address: String,
  geoCode: Object,
  hours:
  {
    monday: String,
    tuesday:	String,
    wednesday:	String,
    thursday:	String,
    friday:	String,
    saturday:	String,
    sunday:	String,
  }
});

  //look at antoinettes mongo
  restaurntSchema.pre('save', function(next) {
    next();
  });

  // step 2 - create the model
  var Restaurant = mongoose.model('Dish', dishSchema);

  // step 3 - export our model
  module.exports = Dish;
