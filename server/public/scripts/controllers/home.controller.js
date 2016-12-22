app.controller('HomeController', ['$http', '$mdDialog', 'DataFactory', '$firebaseAuth', function($http, $mdDialog, DataFactory, $firebaseAuth){
  var self = this;
  self.dishes = [];
  self.yums = [];
  self.clickedDishes=[];
  self.clickedDish ={};
  self.currentRestaurant = {};
  self.currentDish = {};
  self.randomNumber = 0;
  var auth = $firebaseAuth();
  self.filteredResults = []



  //get all dishes
  self.getDishes = function() {
    self.dishes = [];
    $http.get('/dishes/dishes')
      .then(function(response) {
        self.filteredResults = response.data;
        self.dishes = response.data;
        DataFactory.dishes = response.data
        // console.log("INITIAL GET", self.dishes);
        self.cuisineTypeFilter();

    });
  }

  self.getDishes();//runs once on page load

  //filter results
  self.cuisineTypeFilter = function(){
    self.filteredResults = [];
    for (var i = 0; i < self.dishes.length; i++) {
      var addToFilteredList = false;
      for (var j = 0; j < self.dishes[i].cuisinetype.length; j++) {
        for (var k = 0; k < DataFactory.cuisineTypesSelected.length; k++) {
          if (self.dishes[i].cuisinetype[j]== DataFactory.cuisineTypesSelected[k]) {
            addToFilteredList = true;
          }
        }
      }
      if( addToFilteredList == true){

        self.filteredResults.push(self.dishes[i]);
      }
    }
    self.dishes =  self.filteredResults
    getRandomDish();
    // console.log("filtered dishes", self.filteredResults);
  }

  //get a random dish
  function getRandomDish(){
    self.randomNumber = randomNumberGen(0, self.dishes.length-1)
    self.currentDish = self.dishes[self.randomNumber];

    self.getRestaurant();
  }

  //get current restaurant assisiated with dish id from DB
  self.getRestaurant = function(){
    $http.get('/dishes/currentRestaurantfromDb/' + self.currentDish.restaurant_id )
      .then(function(response) {
        self.currentRestaurant = response.data;
        DataFactory.currentRestaurant = self.currentRestaurant;
        self.currentDish.currentRestaurant = self.currentRestaurant;
        console.log("current dish and restaurant", self.currentDish);
      });
  }

  //Yum button clicked
  self.yumButton = function(){
    if(self.dishes.length > 1 ){
      self.yums.push(self.currentDish)
      console.log("yums",self.yums);
      self.clickedDishes.push(self.currentDish)
      self.dishes.splice(self.randomNumber,1);
      console.log(" Clicked Dishes", self.clickedDishes);
      DataFactory.yums = self.yums;
      self.cuisineTypeFilter();
      getFavorites();
      console.log("CLICK total clicked dishes length ", self.clickedDishes.length);
      console.log("Dishes length ", self.dishes.length);
    } else {
    self.currentDish.photourl = "../../assets/sadegg.jpg";
    self.currentDish.dishName = "No More Dishes :(";
    self.currentDish.currentRestaurant[0].name = "So Sad";
    }
  }

  //Naw button clicked
  self.nawButton = function(){
    if (self.dishes.length > 1 ){
      self.clickedDishes.push(self.currentDish);
      self.dishes.splice(self.randomNumber,1);
      console.log(" Clicked Dishes", self.clickedDishes);
      self.cuisineTypeFilter();
      getFavorites();
      console.log("CLICK total clicked dishes length ", self.clickedDishes.length);
      console.log("Dishes length ", self.dishes.length);
    } else {
      self.currentDish.photourl = "../../assets/sadegg.jpg";
      self.currentDish.dishName = "No More Dishes :(";
      self.currentDish.currentRestaurant[0].name = "So Sad";
    }
  }

  //Check authorization satus
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

  //info pop up
  self.infoButton = function(ev){
    if(self.dishes.length > 1 ){
      $mdDialog.show({
        controller: 'InfopopupController as ip',
        templateUrl: '../../views/templates/popups/infopopup.html',

        targetEvent: ev,
        clickOutsideToClose:true,
        fullscreen: self.customFullscreen // Only for -xs, -sm breakpoints.
      });
    }
  }

  //Yum review pop up
  self.yumReviewButton = function(ev){
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
    if(self.dishes.length > 1 ){
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
  }


  //get favoirtes. then review to see if any of the user's favorites are the current dish
  function getFavorites() {
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

  //function to generate a random number
  function randomNumberGen(min, max){
      return Math.floor(Math.random() * (1 + max - min) + min);
  }

}]);
