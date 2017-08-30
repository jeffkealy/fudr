require('dotenv').config();

var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var portDecision = process.env.PORT || 5000;
var dishes = require('./routes/dishes');
var mongoose = require('mongoose');
var mongoConnection = require('./routes/modules/mongo-connection.js');
var privateData = require('./routes/auth-data');
var decoder = require('./routes/modules/decoder.js');

app.get('/', function(req, res){
  res.sendFile(path.resolve('./server/public/views/index.html'));
});
app.use(express.static('server/public'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/dishes', dishes);

app.use(decoder.token);



/** ---------- EXPRESS ROUTES ---------- **/

app.use("/privateData", privateData);



/** ---------- MONGOOSE CONNECTION HANDLING ---------- **/
mongoConnection.connect();



/** ---------- START SERVER ---------- **/
app.listen(portDecision, function(){
  console.log('running on port', portDecision);
});
