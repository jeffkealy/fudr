var express = require('express');
var router = express.Router();
var User = require('../models/userSchema.js');
var Favorite = require('../models/favoriteSchema.js');

router.get("/", function(req, res){
  var userEmail = req.decodedToken.email;
  // Check the user's level of permision based on their email
  User.findOne({ email: userEmail }, function (err, user) {
    if (err) {
      console.log('Error COMPLETING clearanceLevel query task', err);
      res.sendStatus(500);
    } else {
      console.log("requested User", user.email);
      if(user == null) {
        // If the user is not in the database, return a forbidden error status
        console.log('No user found with that email. Have you added this person to the database? Email: ', req.decodedToken.email);
        res.sendStatus(403);
      } else {
        // Based on the clearance level of the individual, give them access to different information
        Favorite.find({ secrecyLevel: { $lte: user.clearanceLevel } }, function (err, favorite){
          if (err) {
            console.log('Error COMPLETING secrecyLevel query task', err);
            res.sendStatus(500);
          } else {
            // return all of the results where a specific user has permission
            res.send(favorite);
          }
        });
      }
    }
  });
});

router.post("/", function(req, res){
  var userEmail = req.decodedToken.email;
  var newUser = req.body;
  // Check the user's level of permision based on their email
  User.findOne({ email: userEmail }, function (err, user) {
    if (err) {
      console.log('Error COMPLETING clearanceLevel query task', err);
      res.sendStatus(500);
    } else {
      console.log("requested User", user);
      if(user == null) {
        // If the user is not in the database, return a forbidden error status
        console.log('No user found with that email. Have you added this person to the database? Email: ', req.decodedToken.email);
        res.sendStatus(403);
      } else {
        // Based on the clearance level of the individual, give them access to different information
        if(user.clearanceLevel >= newUser.clearanceLevel) {
          var personToAdd = new User(newUser);
          personToAdd.save(function(err){
            if(err){
              console.log('There was an error inserting new user, ', err);
              res.sendStatus(500);
            } else {
              res.send(201);
            }
          });
        } else {
          res.sendStatus(403);
        }
      }
    }
  });
});


router.get('/favorites/', function(req, res){
  var query = { email: req.headers.email};
  User.findOne(query, function(err, data) {
      if(err) {
        console.log('Put ERR: ', err);
        res.sendStatus(500);
      } else {
        res.send(data);
      }
  })
})

router.put('/addFavorite/', function(req, res){
  console.log("req.body", req.body);
  var conditions = { email: req.body.currentUserEmail};
  var update = { $addToSet: { favorites: req.body.currentDishId } };
  var options = {upsert: true};
  User.findOneAndUpdate(conditions, update, function(err, data) {
      if(err) {
        console.log('Put ERR: ', err);
        res.sendStatus(500);
      } else {
        res.sendStatus(200);
      }
  })
})

router.delete('/removeFavorite/', function(req, res){
  console.log("req.headers.dish_id", req.headers.dish_id);
  console.log("req.headers.user_email", req.headers.user_email);
  var conditions = { email: req.headers.user_email};
  var update = { $pull: { favorites: req.headers.dish_id } };
  var options = {upsert: true};
  User.findOneAndUpdate(conditions, update, function(err, data) {
      if(err) {
        console.log('Put ERR: ', err);
        res.sendStatus(500);
      } else {
        res.sendStatus(200);
      }
  })
})

module.exports = router;
