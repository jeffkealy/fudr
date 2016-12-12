var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var favoriteSchema = new Schema({
  dishId: { type: String, required: true }
  
});

var Favorite = mongoose.model('Favorite', favoriteSchema);

module.exports = Favorite;
