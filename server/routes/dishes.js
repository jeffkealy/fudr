var express = require('express');
var router = express.Router();
// bring in our mongoose model
var Restaurant = require('../models/restaurantSchema');
var Dish = require('../models/dishSchema');
var https = require('https');
var Factual = require('factual-api');
require('dotenv').config();
var factual = new Factual(process.env.OAuth_KEY, process.env.OAuth_Secret);


//Get for searchdish page
router.get('/', function (req, results){
//request to Api
  factual.get('/t/places-us', {q:req.query.name, filters:{"locality":req.query.location}}, function (error, res) {
                              // {q:req.query.name,
                              // filters:{"$and":[
                              // {"locality":req.query.location},
                              // {category_ids:{"$includes_any":[312,464]}}
                              // ]}}, function (error, res) {
    console.log(res.data);
    results.send(res.data);
  });

});

// post restaurant to my DB
router.post('/restaurant', function(req, res){
  var addedRestaurant = new Restaurant(req.body);
  addedRestaurant.save(function(err, data){
    console.log('save data', data);
    if(err){
      console.log('ERR: ', err);
    } else {
      console.log("Sending data");
      res.send(data);
    }
  })
})

//search my DB for restaurants
// router.get('/fromDb', function(req, res) {
//   console.log("req.query", req.query);
//   Restaurant.find({name:req.query.name}, function(err, people) {
//     if(err) {
//       console.log('Get ERR: ', err);
//       res.sendStatus(500);
//     } else {
//       res.send(people);
//     }
//   });
// });

module.exports = router;
