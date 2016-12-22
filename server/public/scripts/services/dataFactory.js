app.factory('DataFactory', ['$http',function($http) {
  var placeObj = {
    place: {}, //place clicked from searchdish.conroller.js at 23, then adddish.controller.js at 59
    yums: [], //set at home.controller.js line 81
    currentRestaurant: [],
    currentDish: {},
    firebaseUserName: {},
    dishes: [], //set a home.controller.js line 23
    filteredDishes: [], //set at menu.contoller.js line 51
    favorites: [], //set at home.contoller.js line 269
    cuisineTypes: ["African", "American", "Asian", "Brunch", "Caribbean", "Dessert", "Fast Food", "French", "Greek", "Hot Dogs", "Ice Cream", "Indian","Italian", "Latin American", "Mexican", "Pizza", "Sandwiches", "Seafood", "Shushi" , "Spanish"],
    cuisineTypesSelected: ["African", "American", "Asian", "Brunch", "Caribbean", "Dessert", "Fast Food", "French", "Greek", "Hot Dogs", "Ice Cream", "Indian", "Italian", "Latin American", "Mexican", "Pizza", "Sandwiches", "Seafood", "Shushi" , "Spanish"]
  };



  return placeObj;

}]);
