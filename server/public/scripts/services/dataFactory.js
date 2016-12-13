app.factory('DataFactory', ['$http',function($http) {
  console.log("data factory running");
  var placeObj = {
    place: {},
    yums: [],
    currentRestaurant: [],
    firebaseUserName: {},
    dishes: [],
    favorites: []
  };

  return placeObj;

}]);
