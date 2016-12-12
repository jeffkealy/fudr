app.factory('DataFactory', ['$http',function($http) {
  console.log("data factory running");
  var placeObj = {
    place: {},
    yums: [],
    currentRestaurant: []
  };
  console.log("DATAFplaceObj.currentRestaurant", placeObj.currentRestaurant);
  return placeObj;

}]);
