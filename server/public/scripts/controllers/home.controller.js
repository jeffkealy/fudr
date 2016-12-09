app.controller('HomeController', ['$http', '$mdDialog', function($http, $mdDialog){
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


    });
  }
  //Yum button clicked
  self.yumButton = function(){
    self.yums.push(self.currentDish)
    self.dishes.splice(self.randomNumber,1)
    console.log("dish to remove", self.currentDish);
    console.log("current dishes", self.dishes);
    console.log("Yums", self.yums);
    self.randomNumber = randomNumberGen(0, self.dishes.length-1)
    self.currentDish = self.dishes[self.randomNumber];




  }
  //Naw button clicked
  self.nawButton = function(){
    console.log("clicked the Naw button");
    self.dishes.splice(self.randomNumber,1)
    self.randomNumber = randomNumberGen(0, self.dishes.length-1)
    self.currentDish = self.dishes[self.randomNumber];
    console.log("current dishes", self.dishes);

  }
  self.infoButton = function(ev){
    console.log("current restaurant", self.currentRestaurant);
    $mdDialog.show(
      $mdDialog.alert()
        .parent(angular.element(document.querySelector('#infoButton')))
        .clickOutsideToClose(true)
        .title(self.currentDish.dishName + " From " + self.currentRestaurant[0].name)
        .textContent(self.currentRestaurant[0].locality + ", " +self.currentRestaurant[0].region+
                      " : Open " + self.currentRestaurant[0].hours_display)
        .ariaLabel('Offscreen Demo')
        .ok('Close')
        .targetEvent(ev)
    );
  }

  self.getRandomDish();

  function randomNumberGen(min, max){
      return Math.floor(Math.random() * (1 + max - min) + min);
  }

}]);
