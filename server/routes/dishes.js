var express = require('express');
var router = express.Router();
// bring in our mongoose model
var Dish = require('../models/dishSchema');
var https = require('https');
var geoKey = 'AIzaSyD4a6pLWWQKnwC2tWXVme_-p3KBx7WXoQU';
var key = '&key=AIzaSyAHVcNSq8PjXDrUSjnoSi-z3HOdrsgniWQ';
var query = 'https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurant+';
//var request = encodeURI('https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants+in+55409&key=AIzaSyBiMubXEKljXk7iYHzhz76eeOwMgcaIpKM')

// router.post('/places', function(req, res){
//   console.log("got to the post", req.body);
//   var urlPost = req.body.url + key;
//   getPlaces(urlPost);
//   res.sendStatus(201);
// });



//get the api information to the controller
router.get('/places/:id', function(req, results){
  theUrl = encodeURI(query + req.params.id + key);
  //api call to google places
  https.get(theUrl, function(res){
    var body = "";
    res.on('data', function (chunk) {
      //concatenate string chunks as received
      body += chunk.toString();
    });
    res.on('end', function(){
      //turn string body back to json.
      body = JSON.parse(body);
      //console.log("FULL BODY: ", body);
          results.send(body);
        })
    }).on('error', function(res){
      console.log("error", res);
    });
});






// function getGeocode(){
//   var query = 'https://maps.googleapis.com/maps/api/geocode/json?address=querystreetAddressMinneapolis,+MN'
//   query += '&key='+geoKey;
//   console.log(query);
//   var request = encodeURI(query);
//   https.get(request, function(res){
//     console.log('request done');
//     var body = "";
//     console.log(res.results);
//     res.on('data', function (chunk) {
//       //concatenate string chunks as received
//       body += chunk.toString();
//     });
//     res.on('end', function(){
//       //turn string body back to json.
//       body = JSON.parse(body);
//       console.log("FULL BODY: ", body.results[0].geometry);
//       // selectPotentialHazards();
//     });
//   }).on('error', function(res){
//     console.log("error", res);
//   })
// }


module.exports = router;
