app.factory('DataFactory', ['$http',function($http) {
  var placeObj = {
    place: {}, //place clicked from searchdish.conroller.js at 23, then adddish.controller.js at 59
    yums: [], //set at home.controller.js line 81
    currentRestaurant: [],
    currentDish: {},
    dishes: [], //set a home.controller.js line 23
    firebaseUser: {},
    firebaseUserName: {},
    filteredDishes: [], //set at menu.contoller.js line 51
    filteredResults: [],
    favorites: [], //set at home.contoller.js line 269
    cuisineTypes: ["African", "American", "Asian", "Brunch", "Burger", "Caribbean", "Dessert", "Fast Food", "French", "Greek", "Hot Dogs", "Indian", "Italian", "Latin American", "Mexican", "Pizza", "Sandwich", "Seafood", "Shushi" , "Spanish", "Vegetarian"],
    cuisineTypesSelected: ["African", "American", "Asian", "Brunch", "Burger", "Caribbean", "Dessert", "Fast Food", "French", "Greek", "Hot Dogs", "Indian", "Italian", "Latin American", "Mexican", "Pizza", "Sandwich", "Seafood", "Shushi", "Spanish", "Vegetarian"],
    randomNumber: 0

  };



  return placeObj;

}]);
