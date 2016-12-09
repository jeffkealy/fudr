app.controller('SearchController', ['$http', '$location', 'DataFactory', function($http, $location, DataFactory){
  console.log("Search controller running");
  var self = this;
  self.placesReturnedFromApi = [];
  self.searchPlace = {}


//get places from api request
self.searchPlaces = function(){
  var urlId = '?name=';
  urlId += self.searchPlace.restaurant;
  urlId += '&location=';
  urlId += self.searchPlace.location;
  $http.get('/dishes' + urlId)
    .then(function(response) {
      self.placesReturnedFromApi = response.data;

  });

}

//slecet the place to add
self.clickedPlace = function(place){
  console.log("clicked the place", place);
  DataFactory.placeObj = place;
  $http.post('/dishes/restaurant', place)
    .then(function(response){

    })
  $location.path('/adddish');  
}

}]);
