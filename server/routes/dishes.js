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
      results.send(res.data);
  });

});
//get dishes
router.get('/dishes', function(req,res){
  Dish.find({}, function(err, dishes){
    if(err) {
      console.log('Get ERR: ', err);
      res.sendStatus(500);
    } else {
      res.send(dishes);
    }
  })
})


// post restaurant to my DB
router.post('/restaurant', function(req, res){
  var addedRestaurant = new Restaurant(req.body);
  addedRestaurant.save(function(err, data){
    console.log('save data', data);
    if(err){
      console.log('ERR: ', err);
      res.sendStatus(500);
    } else {
      console.log("Sending data");
      res.send(data);
    }
  })
})

//post dish to my db
router.post('/dish', function(req, res){
  console.log("req.body", req.body);
  var addedDish = new Dish(req.body);
  addedDish.save(function(err, data){
    console.log('save data', data);
    if(err){
      console.log('ERR: ', err);
      res.sendStatus(500);
    } else {
      console.log("Sending data");
      res.send(data);
    }
  })
})

// search my DB for restaurants
router.get('/fromDb', function(req, res) {
  console.log("got to the Get");
  Restaurant.find({}, function(err, people) {
    if(err) {
      console.log('Get ERR: ', err);
      res.sendStatus(500);
    } else {
      res.send(people);
    }
  });
});


// search my DB for current restaurants
router.get('/currentRestaurantfromDb/:id', function(req, res) {
  Restaurant.find({factual_id: req.params.id}, function(err, restaurant) {
    if(err) {
      console.log('Get ERR: ', err);
      res.sendStatus(500);
    } else {

      res.send(restaurant);
    }
  });
});

module.exports = router;
