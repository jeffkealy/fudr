app.controller('HomeController', ['$http', '$mdDialog', 'DataFactory', function($http, $mdDialog, DataFactory){
  console.log("home controller is up");
  var key = 'AIzaSyBiMubXEKljXk7iYHzhz76eeOwMgcaIpKM'
  var self = this;
  self.dishes = [];
  self.yums = [];
  self.currentRestaurant = {};
  self.currentDish = {};
  self.randomNumber = 0;




  self.getRandomDish = function() {
    self.dishes = [];
    self.currentDish = {};
    $http.get('/dishes/dishes')
      .then(function(response) {
        self.dishes = response.data;
          self.randomNumber = randomNumberGen(0, self.dishes.length-1)
          self.currentDish = self.dishes[self.randomNumber];
          self.getRestaurant();



    });

  }


  self.getRestaurant = function(){
    $http.get('/dishes/currentRestaurantfromDb/' + self.currentDish.factual_id )
      .then(function(response) {
        self.currentRestaurant = response.data;
        DataFactory.currentRestaurant = self.currentRestaurant[0];
        self.currentDish.currentRestaurant = self.currentRestaurant;

        console.log("restaurant attached to Dish", self.currentDish.currentRestaurant);



    });
  }
  //Yum button clicked
  self.yumButton = function(){
    console.log("self.dishes.length", self.dishes.length);
    if(self.dishes.length > 0 ){
      self.yums.push(self.currentDish)
      self.dishes.splice(self.randomNumber,1)
      self.randomNumber = randomNumberGen(0, self.dishes.length-1)
      self.currentDish = self.dishes[self.randomNumber];
      DataFactory.yums = self.yums;
      self.getRestaurant();
      console.log("current dishes", self.dishes);
      console.log("Yums", self.yums);
    }
  }
  //Naw button clicked
  self.nawButton = function(){
    if (self.dishes.length > 0 ){
      console.log("clicked the Naw button");
      self.dishes.splice(self.randomNumber,1)
      self.randomNumber = randomNumberGen(0, self.dishes.length-1)
      self.currentDish = self.dishes[self.randomNumber];
      self.getRestaurant();
      console.log("dish to remove", self.currentDish);
    } else {

    }

  }

  //info pop up
  self.infoButton = function(ev){
    $mdDialog.show({
      controller: 'InfopopupController as ip',
      templateUrl: '../../views/templates/popups/infopopup.html',

      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: self.customFullscreen // Only for -xs, -sm breakpoints.
    });
  }

  //Yum review pop up
  self.yumReviewButton = function(ev){
    console.log("current restaurant", self.currentRestaurant);
    $mdDialog.show({
      controller: 'YumreviewpopupController as yrp',
      templateUrl: '../../views/templates/popups/yumreviewpopup.html',

      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: self.customFullscreen // Only for -xs, -sm breakpoints.
    });
  }
  self.getRandomDish();

  function randomNumberGen(min, max){
      return Math.floor(Math.random() * (1 + max - min) + min);
  }

}]);
