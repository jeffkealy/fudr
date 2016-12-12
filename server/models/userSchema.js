var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  clearanceLevel: { type: Number, required: true, default: 0, min: 0, max: 5 },
  favorites: []
});

var User = mongoose.model('User', userSchema);

module.exports = User;
