app.controller('FavoritespopupController', ['$http', '$mdDialog', 'DataFactory', function($http, $mdDialog, DataFactory){
  console.log("favorites pop up controller running");
  var self = this;
  self.favoriteDishes = [];
  self.dishes = DataFactory.dishes;
  self.favorites = DataFactory.favorites.favorites;
  self.favoritesRestaurant_id =[];
  self.favoritesRestaurants = [];

  console.log("first favorite dishes", self.favoritesDishes);


  //Combines the Favorites with the dishes the user selected.
  // self.combineDishesAndFavorites = function(){
    for (var i = 0; i < self.dishes.length; i++) {
      for (var x = 0; x < self.favorites.length ; x++) {
        if (self.dishes[i]._id == self.favorites[x]) {
            self.favoriteDishes.push(self.dishes[i]);
            self.favoritesRestaurant_id.push(self.dishes[i].restaurant_id);
        }
      }

    }

  // }
  
  // self.getRestaurantsFromFavorites = function(){
    $http({
     method: 'PUT',//GET
     url: 'dishes/favoritesRestaurants',
     data: self.favoritesRestaurant_id
     }).then(function(response){
            self.favoritesRestaurants = response.data;
            console.log("favoritesRestaurants", self.favoritesRestaurants);
            console.log("Favorite dishes before loop", self.favoriteDishes);
            console.log("restaurant_id", self.favoritesRestaurant_id);
            for (var i = 0; i < self.favoriteDishes.length; i++) {
              for (var j = 0; j < self.favoritesRestaurants.length; j++) {
                if (self.favoriteDishes[i].restaurant_id == self.favoritesRestaurants[j]._id) {
                  console.log(self.favoriteDishes);
                  self.favoriteDishes.push(self.favoritesRestaurants[j]);
                }
              }
            }
              console.log("favoriteDishes", self.favoriteDishes);
    });
  // }

  //call the functions
  // self.combineDishesAndFavorites();
  // self.getRestaurantsFromFavorites();
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

  self.cancel = function() {
    $mdDialog.cancel();
  };
}]);
