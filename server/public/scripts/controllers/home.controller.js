app.controller('HomeController', ['$http', '$mdDialog', 'DataFactory', 'FoodFactory', '$firebaseAuth', '$mdToast', '$scope', function($http, $mdDialog, DataFactory, FoodFactory, $firebaseAuth, $mdToast, $scope){
  var self = this;
  self.dishes = [];
  self.yums = [];
  self.clickedDishes=[];
  self.clickedDish ={};
  self.currentRestaurant = DataFactory.currentRestaurant;
  self.randomNumber = 0;
  var auth = $firebaseAuth();
  self.filteredResults = []



  //get all dishes
  FoodFactory.factory.getDishes().then(function(response){
    self.dishes = DataFactory.dishes;
    self.currentDish = DataFactory.currentDish
    $scope.currentDish = DataFactory.currentDish


    // cuisineTypeFilter();
  });

  //filter results
  // function cuisineTypeFilter(){
  //   self.filteredResults = [];
  //   for (var i = 0; i < self.dishes.length; i++) {
  //     var addToFilteredList = false;
  //     for (var j = 0; j < self.dishes[i].cuisinetype.length; j++) {
  //       for (var k = 0; k < DataFactory.cuisineTypesSelected.length; k++) {
  //         if (self.dishes[i].cuisinetype[j]== DataFactory.cuisineTypesSelected[k]) {
  //           addToFilteredList = true;
  //         }
  //       }
  //     }
  //     if( addToFilteredList == true){
  //
  //       self.filteredResults.push(self.dishes[i]);
  //     }
  //   }
  //   self.dishes =  self.filteredResults
  //   getRandomDish();
  // }


  // //get a random dish
  // function getRandomDish(){
  //   self.randomNumber = randomNumberGen(0, self.dishes.length-1)
  //   self.currentDish = self.dishes[self.randomNumber];
  //   console.log("current Dish", self.currentDish);
  //   getRestaurant();
  // }
  //
  //
  // //get current restaurant assisiated with dish id from DB
  // function getRestaurant(){
  //   $http.get('/dishes/currentRestaurantfromDb/' + self.currentDish.restaurant_id )
  //     .then(function(response) {
  //       self.currentRestaurant = response.data;
  //       DataFactory.currentRestaurant = self.currentRestaurant;
  //       self.currentDish.currentRestaurant = self.currentRestaurant;
  //     });
  // }

  //Yum button clicked
  self.yumButton = function(ev){
    if(self.dishes.length > 1 ){
      //pop up toast message
      $mdToast.show({
        template: '<md-toast flex><span class="md-toast-text" flex>Yum! That Looks Good!</span></md-toast>' ,
        position:'top',
        hideDelay: 80,
        controller: 'ToastController as TC',
        parent: angular.element(document.getElementsByClassName('homeImage'))
      }).then(function(){
      getFavorites();
      self.yums.push(self.currentDish)
      console.log("yums",self.yums);
      self.clickedDishes.push(self.currentDish)
      DataFactory.dishes.splice(DataFactory.randomNumber,1);
      console.log(" Clicked Dishes", self.clickedDishes);
      DataFactory.yums = self.yums;
      self.currentDish = FoodFactory.factory.cuisineTypeFilter()

      console.log("CLICK total clicked dishes length ", self.clickedDishes.length);
      console.log("Dishes length ", DataFactory.dishes.length);
      })
    } else {
    self.currentDish.photourl = "../../assets/sadegg.jpg";
    self.currentDish.dishName = "No More Dishes :(";
    self.currentDish.currentRestaurant.name = "So Sad";
    }
  }

  //Naw button clicked
  self.nawButton = function(){
    if (self.dishes.length > 1 ){
      //pop up toast message
      $mdToast.show({
        template: '<md-toast flex><span class="md-toast-text" flex>Naw, Not Feeling It</span></md-toast>' ,
        position:'bottom',
        hideDelay: 80,
        controller: 'ToastController as TC',
        parent: angular.element(document.getElementsByClassName('homeImage'))
      }).then(function(){
      getFavorites();
      self.clickedDishes.push(self.currentDish);
      self.dishes.splice(self.randomNumber,1);
      console.log(" Clicked Dishes", self.clickedDishes);
      self.currentDish = FoodFactory.factory.cuisineTypeFilter();
      console.log("CLICK total clicked dishes length ", self.clickedDishes.length);
      console.log("Dishes length ", self.dishes.length);
      });
    } else {
      self.currentDish.photourl = "../../assets/sadegg.jpg";
      self.currentDish.dishName = "No More Dishes :(";
      self.currentDish.currentRestaurant.name = "So Sad";
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
      DataFactory.firebaseUser = firebaseUser;
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
        fullscreen: true // Only for -xs, -sm breakpoints.
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
      fullscreen: true // Only for -xs, -sm breakpoints.
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
                  console.log("Added dish " + self.currentDish._id + " as fav");

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

  //clicking the Ok button on the filter popup
  self.cancel = function() {
    console.log("click");
    getRandomDish();
    $mdDialog.cancel();
  };


  //function to generate a random number
  function randomNumberGen(min, max){
      return Math.floor(Math.random() * (1 + max - min) + min);
  }

}]);
