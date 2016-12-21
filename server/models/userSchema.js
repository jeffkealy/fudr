var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  clearanceLevel: { type: Number, required: true, default: 1, min: 1, max: 3 },
  favorites: {type: [String] , unique: true}
});

var User = mongoose.model('User', userSchema);

module.exports = User;
