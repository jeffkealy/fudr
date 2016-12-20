app.factory('DataFactory', ['$http',function($http) {
  var placeObj = {
    place: {},
    yums: [],
    currentRestaurant: [],
    currentDish: {},
    firebaseUserName: {},
    dishes: [],
    filteredDishes: [],
    favorites: [],
    cuisineTypes: ["African", "American", "Asian", "Brunch", "Caribbean", "Dessert", "Fast Food", "French", "Greek", "Hot Dogs", "Ice Cream", "Indian","Italian", "Latin American", "Mexican", "Pizza", "Sandwiches", "Seafood", "Shushi" , "Spanish"],
    cuisineTypesSelected: ["African", "American", "Asian", "Brunch", "Caribbean", "Dessert", "Fast Food", "French", "Greek", "Hot Dogs", "Ice Cream", "Indian", "Italian", "Latin American", "Mexican", "Pizza", "Sandwiches", "Seafood", "Shushi" , "Spanish"]
  };



  return placeObj;

}]);
