var mongoose = require('mongoose');
//var databaseUri = 'mongodb://localhost:27017/Fudr';

var databaseUri = '';
// process.env.MONGODB_URI will only be defined if you
// are running on Heroku
if(process.env.MONGODB_URI != undefined) {
    // use the string value of the environment variable
    databaseUri = process.env.MONGODB_URI;
} else {
    // use the local database server
    //databaseUri = 'mongodb://localhost:27017/Fudr';

    //point to mlab database
    databaseUri = 'mongodb://'+process.env.username+':'+process.env.password +'@ds133428.mlab.com:33428/heroku_h099xt12'

}


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
