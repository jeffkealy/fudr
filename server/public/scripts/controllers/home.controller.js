app.controller('HomeController', ['$http', '$mdDialog', 'DataFactory', '$firebaseAuth', function($http, $mdDialog, DataFactory, $firebaseAuth){
  console.log("home controller is up");
  var key = 'AIzaSyBiMubXEKljXk7iYHzhz76eeOwMgcaIpKM'
  var self = this;
  self.dishes = [];
  self.yums = [];
  self.currentRestaurant = {};
  self.currentDish = {};
  self.randomNumber = 0;
  var auth = $firebaseAuth();


  auth.$onAuthStateChanged(function(firebaseUser){
    // firebaseUser will be null if not logged in
    self.currentUser = firebaseUser;
    if (firebaseUser == null) {
      console.log("Not logged in yet");
      DataFactory.firebaseUserName.displayName = "Log In"
    } else {
      DataFactory.firebaseUserName.displayName = self.currentUser.displayName;
    }
    if(firebaseUser) {
      // This is where we make our call to our server
      firebaseUser.getToken().then(function(idToken){
        $http({
          method: 'GET',
          url: '/privateData',
          headers: {
            id_token: idToken
          }
        }).then(function(response){
          self.secretData = response.data;

        });
      });
    } else {
      console.log('Not logged in or not authorized.');
      self.secretData = [];
    }

  });


  self.getRandomDish = function() {
    self.dishes = [];
    self.currentDish = {};
    $http.get('/dishes/dishes')
      .then(function(response) {
        self.dishes = response.data;
          self.randomNumber = randomNumberGen(0, self.dishes.length-1)
          self.currentDish = self.dishes[self.randomNumber];
          DataFactory.dishes = self.dishes;
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

  //Add/remove favorite button
  self.addFavoriteButton = function(){
    favorite = {
      currentDishId: self.currentDish._id,
      currentUserEmail: self.currentUser.email
    }
    if(self.currentUser) {
      self.currentUser.getToken().then(function(idToken){
        $http({
          method: 'GET',
          url: '/privateData',
          headers: {
            id_token: idToken
          }
        }).then(function(response){
          console.log("self.favorite", favorite);
          $http({
            method: 'PUT',
            url: "/privateData/addfavorite",
            headers: {
              id_token: idToken
            },
            data: favorite
          }).then(function(response){
              console.log("added Favorite");

            })
        });
      });
    } else {
      console.log('Not logged in or not authorized.');
      self.secretData = [];
    }

  }

  //list favorites button
  self.favoritesButton = function(ev){
    if(self.currentUser) {
      self.currentUser.getToken().then(function(idToken){
        $http({
          method: 'GET',
          url: '/privateData',
          headers: {
            id_token: idToken
          }
        }).then(function(response){
          $http({
            method: 'GET',
            url: "/privateData/favorites",
            headers: {
              id_token: idToken,
              email: self.currentUser.email
            }
          }).then(function(response){

              DataFactory.favorites = response.data;
              console.log("Got favorites. response: ", DataFactory.favorites);
              console.log(DataFactory.dishes);
              $mdDialog.show({
                controller: 'FavoritespopupController as fp',
                templateUrl: '../../views/templates/popups/favoritespopup.html',
                targetEvent: ev,
                clickOutsideToClose:true,
                fullscreen: self.customFullscreen // Only for -xs, -sm breakpoints.
              });

            })
        });
      });
    } else {
      console.log('Not logged in or not authorized.');
      self.secretData = [];
    }

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
