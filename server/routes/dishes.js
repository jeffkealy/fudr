var express = require('express');
var router = express.Router();
// bring in our mongoose model
var Dish = require('../models/dish');
var https = require('https');

//
// router.get('/', function(req, res) {
//
//   Dish.find({}, function(err, people) {
//     if(err) {
//       console.log('Get ERR: ', err);
//       res.sendStatus(500);
//     } else {
//       res.send(people);
//     }
//   });
// });
getGeocode();
function getGeocode(){
  var request = encodeURI('https://maps.googleapis.com/maps/api/geocode/json?address=querystreetAddressMinneapolis,+MN&key=AIzaSyD4a6pLWWQKnwC2tWXVme_-p3KBx7WXoQU')


  https.get(request, function(res){
    console.log(res);
    res.on('end', function(){
    })

  })
  // .then(function(response){
  //
  //   console.log("response", response);
  // })

}

module.exports = router;
