app.controller('FavoritespopupController', ['$http', '$mdDialog', 'DataFactory', function($http, $mdDialog, DataFactory){
  console.log("favorites pop up controller running");
  var self = this;
  self.dishes = DataFactory.dishes
  self.favorites = DataFactory.favorites.favorites
  self.favoriteDishes = [];
  for (var i = 0; i < self.dishes.length; i++) {
    for (var x = 0; x < self.favorites.length ; x++) {
      if (self.dishes[i]._id == self.favorites[x]) {
          self.favoriteDishes.push(self.dishes[i])
      }
    }

  }
  
  console.log("DataFactory Favorites", self.favorites);
  console.log("DataFactory dishes", self.dishes);
  console.log("DataFactory favoriteDishes", self.favoriteDishes);
  // console.log("favorite Button Object", self.dishes);
  self.cancel = function() {
    $mdDialog.cancel();
  };
}]);
