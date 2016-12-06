var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// Create the Schema
var dishSchema = new Schema({
  name: {type: String, required: true},
  streetAddress: String,
  city: String,
  state: String,
  zip: String,
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
  },
  dishimage: [
            {
            name: String,
            photourl: String,
            cuisinetype: [String]
            }
          ]
  });


dishSchema.pre('save', function(next) {
  next();
});

// step 2 - create the model
var Dish = mongoose.model('Dish', dishSchema);

// step 3 - export our model
module.exports = Dish;
