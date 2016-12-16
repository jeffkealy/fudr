app.controller('HomeController', ['$http', '$mdDialog', 'DataFactory', '$firebaseAuth', function($http, $mdDialog, DataFactory, $firebaseAuth){
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
          console.log("logged in");
          getFavorites();


        });
      });
    } else {
      console.log('Not logged in or not authorized.');
      self.secretData = [];
    }

  });



  //get all dishes
  self.getDishes = function() {
    self.dishes = [];
    self.currentDish = {};
    $http.get('/dishes/dishes')
      .then(function(response) {
        self.dishes = response.data;
        getRandomDish();
        cuisineTypeFilter();
        self.getRestaurant();



    });

  }

  self.getDishes();

  //get random dish
  function getRandomDish(){
    self.randomNumber = randomNumberGen(0, self.dishes.length-1)
    self.currentDish = self.dishes[self.randomNumber];
    console.log("currentDish", self.currentDish);
    DataFactory.dishes = self.dishes;
  }

  self.getRestaurant = function(){
    $http.get('/dishes/currentRestaurantfromDb/' + self.currentDish.restaurant_id )
      .then(function(response) {
        self.currentRestaurant = response.data;
        DataFactory.currentRestaurant = self.currentRestaurant[0];
        self.currentDish.currentRestaurant = self.currentRestaurant;

        // console.log("restaurant attached to Dish", self.currentDish.currentRestaurant);
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
      getFavorites();
      cuisineTypeFilter();
      //add true/false to current dish to indicate favorite
      //ng-class -give an object to test if true/false
      DataFactory.yums = self.yums;
      self.getRestaurant();
      // console.log("current dishes", self.dishes);
      // console.log("Yums", self.yums);
    }
  }
  //Naw button clicked
  self.nawButton = function(){
    if (self.dishes.length > 0 ){
      // console.log("clicked the Naw button");
      self.dishes.splice(self.randomNumber,1)
      self.randomNumber = randomNumberGen(0, self.dishes.length-1)
      self.currentDish = self.dishes[self.randomNumber];
      getFavorites();
      cuisineTypeFilter();
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

  //Add/remove favorite button
  self.addFavoriteButton = function(){
    if (self.currentDish.favorite == true) {
      console.log("if true, change to ", self.currentDish.favorite);
        var currentDishId = self.currentDish._id;
        var currentUserEmail = self.currentUser.email;
      if(self.currentUser) {
        self.currentUser.getToken().then(function(idToken){
          $http({
            method: 'GET',
            url: '/privateData',
            headers: {
              id_token: idToken
            }
          }).then(function(response){
            console.log("req to send", favorite);
            $http({
              method: 'DELETE',
              url: "/privateData/removeFavorite",
              headers: {
                id_token: idToken,
                dish_id: currentDishId,
                user_email: currentUserEmail
              }
            }).then(function(response){
                self.currentDish.favorite = true;
                getFavorites();
                console.log("Removed dish " + self.currentDish._id + " as fav"  );

              })
          });
        });
      } else {
        console.log('Not logged in or not authorized.');
        self.secretData = [];
      }

    } else {

       var favorite = {
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
            console.log("req to send", favorite);
            $http({
              method: 'PUT',
              url: "/privateData/addFavorite",
              headers: {
                id_token: idToken
              },
              data: favorite
            }).then(function(response){
              self.currentDish.favorite = false;
                getFavorites()
                console.log("Added dish " + self.currentDish._id + "as fav");

              })
          });
        });
      } else {
        console.log('Not logged in or not authorized.');
        self.secretData = [];
      }
    }
  }

  //list favorites button
  self.favoritesButton = function(ev){
    $mdDialog.show({
      controller: 'FavoritespopupController as fp',
      templateUrl: '../../views/templates/popups/favoritespopup.html',
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: self.customFullscreen // Only for -xs, -sm breakpoints.
    });
  }

  function getFavorites() {//get favoirtes. then review to see if any of the user's favorites are the current dish
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
              self.currentDish.favorite = false;
              DataFactory.favorites = response.data;
              for (var i = 0; i < DataFactory.favorites.favorites.length; i++) {
                if (self.currentDish._id == DataFactory.favorites.favorites[i] ) {
                  console.log("Theres a favorite here");
                  self.currentDish.favorite = true;
                }
              }
            })
        });
      });
    } else {
      console.log('Not logged in or not authorized.');
      self.secretData = [];
    }
  }

  //logic to filter by cuisne type
  function cuisineTypeFilter() {
    console.log("DataFactory.cuisineTypesSelected", DataFactory.cuisineTypesSelected);
    console.log("self.currentDish.cuisinetype", self.currentDish.cuisinetype);
    for (var i = 0; i < DataFactory.cuisineTypesSelected.length; i++) {
      for (var x = 0; x < self.currentDish.cuisinetype.length; x++) {
        if (DataFactory.cuisineTypesSelected[i] == self.currentDish.cuisinetype[x]) {
          console.log("diplay this dish");
        }
        else {
        console.log("dont display this dish");
        }
      }
    }
  }

  function randomNumberGen(min, max){
      return Math.floor(Math.random() * (1 + max - min) + min);
  }

}]);
