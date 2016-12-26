app.controller('FavoritespopupController', ['$http', '$mdDialog', 'DataFactory', '$firebaseAuth', function($http, $mdDialog, DataFactory, $firebaseAuth){
  console.log("favorites pop up controller running");
  var self = this;
  self.favoriteDishes = [];
  self.dishes = DataFactory.dishes;
  self.favorites = DataFactory.favorites.favorites;
  self.favoritesRestaurant_id =[];
  self.favoritesRestaurants = [];

  console.log("first favorite dishes", self.favoritesDishes);


  //Combines the Favorites with the dishes the user selected.
  self.combineDishesAndFavorites = function(){
    for (var i = 0; i < self.dishes.length; i++) {
      for (var x = 0; x < self.favorites.length ; x++) {
        if (self.dishes[i]._id == self.favorites[x]) {
            self.favoriteDishes.push(self.dishes[i]);
            self.favoritesRestaurant_id.push(self.dishes[i].restaurant_id);
        }
      }
    }
  }

  self.combineDishesAndFavorites();

  self.getRestaurantsFromFavorites = function(){
    $http({
     method: 'PUT',//GET
     url: 'dishes/favoritesRestaurants',
     data: self.favoritesRestaurant_id
     }).then(function(response){
            self.favoritesRestaurants = response.data;
            for (var i = 0; i < self.favoriteDishes.length; i++) {
              for (var j = 0; j < self.favoritesRestaurants.length; j++) {
                if (self.favoriteDishes[i].restaurant_id == self.favoritesRestaurants[j]._id) {
                  self.favoriteDishes[i].restaurant = self.favoritesRestaurants[j];
                }
              }
            }
              console.log("favoriteDishes", self.favoriteDishes);
    });
  }

  self.getRestaurantsFromFavorites();

  //Delete favoirte
  self.deleteFavoriteButton = function(index){
    self.currentUser = DataFactory.firebaseUser;
    console.log("firebaseuer", self.currentUser);
    console.log("clicked", self.favoriteDishes[index]._id);
    var currentDishId = self.favoriteDishes[index]._id
    var currentUserEmail = self.currentUser.email
    self.currentUser.getToken().then(function(idToken){
        $http({
          method: 'DELETE',
          url: "/privateData/removeFavorite",
          headers: {
            id_token: idToken,
            dish_id: currentDishId,
            user_email: currentUserEmail
          }
        }).then(function(response){
            self.favoriteDishes.splice(index,1)

            console.log("Removed dish " + self.favoriteDishes._id + " as fav"  );


          })

    });

  }

  //call the functions
  // self.combineDishesAndFavorites();
  // self.getRestaurantsFromFavorites();


  self.cancel = function() {
    $mdDialog.cancel();
  };
}]);
