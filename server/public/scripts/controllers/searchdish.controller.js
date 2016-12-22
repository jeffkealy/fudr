app.controller('SearchController', ['$http', '$location', 'DataFactory', function($http, $location, DataFactory){
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
  DataFactory.place = place;
  console.log("place after click");
  $http.post('/dishes/restaurant', place)
    .finally(function(response){
      console.log("response", response);
      $http.get('/dishes/searchRestaurantByFactualId/' + DataFactory.place.factual_id)
        .then(function(response){
          DataFactory.place = response.data
          console.log("FINALLY: place to send to adddish", DataFactory.place);
        });
    });

  $location.path('/adddish');
  console.log("clicked the place", DataFactory.place);
}

}]);
