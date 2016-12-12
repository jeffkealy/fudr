var mongoose = require('mongoose');
var databaseUri = 'mongodb://localhost:27017/sigma';

var connectToMongoDatabase = function() {
  mongoose.connect(databaseUri);

  mongoose.connection.on('connected', function() {
    console.log('mongoose connected to ', databaseUri);
  });

  mongoose.connection.on('error', function(err) {
    console.log('mongoose connection error: ', err);
  });
}

module.exports = { connect: connectToMongoDatabase };
