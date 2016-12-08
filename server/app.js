var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
var portDecision = process.env.PORT || 3000;
var dishes = require('./routes/dishes');
var mongoose = require('mongoose');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/', function(req, res){
  res.sendFile(path.resolve('./server/public/views/index.html'));
});

/** ---------- EXPRESS ROUTES ---------- **/
app.use('/dishes', dishes);

/** ---------- MONGOOSE CONNECTION HANDLING ---------- **/
var databaseUri = 'mongodb://localhost:27017/sigma';
mongoose.connect(databaseUri);

mongoose.connection.on('connected', function() {
  console.log('mongoose connected to ', databaseUri);
});

mongoose.connection.on('error', function(err) {
  console.log('mongoose connection error: ', err);
});

app.use(express.static('server/public'));

/** ---------- START SERVER ---------- **/
app.listen(portDecision, function(){
  console.log('running on port', portDecision);
});
