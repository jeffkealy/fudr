app.factory('DataFactory', ['$http',function($http) {
  var placeObj = {
    place: {},
    yums: [],
    currentRestaurant: [],
    currentDish: {},
    dishes: [],
    firebaseUser: {},
    firebaseUserName: {},
    filteredDishes: [],
    filteredResults: [],
    favorites: [], 
    cuisineTypes: ["African", "American", "Asian", "Brunch", "Burger", "Caribbean", "Dessert", "Fast Food", "French", "Greek", "Hot Dogs", "Indian", "Italian", "Latin American", "Mexican", "Pizza", "Sandwich", "Seafood", "Shushi" , "Spanish", "Vegetarian"],
    cuisineTypesSelected: ["African", "American", "Asian", "Brunch", "Burger", "Caribbean", "Dessert", "Fast Food", "French", "Greek", "Hot Dogs", "Indian", "Italian", "Latin American", "Mexican", "Pizza", "Sandwich", "Seafood", "Shushi", "Spanish", "Vegetarian"],
    randomNumber: 0

  };



  return placeObj;

}]);
