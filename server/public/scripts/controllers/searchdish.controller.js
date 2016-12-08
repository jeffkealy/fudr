app.controller('SearchController', ['$http', '$location', 'DataFactory', function($http, $location, DataFactory){
  console.log("Search controller running");
  var self = this;
  self.placesReturnedFromApi = [];
  self.searchPlace = {}


//get places from api request
self.searchPlaces = function(){
  var restaurantName = self.searchPlace.restaurant;
  var searchLocation = self.searchPlace.location
  var query = restaurantName;
  query += '+in+';
  query += searchLocation;

  urlToPost = encodeURI(query);
  self.searchPlace.url = urlToPost
  console.log("object to send", self.searchPlace);
  //request to get places
  $http.get('/dishes/places/' + urlToPost)
    .then(function(response) {
      console.log(response.data.results);
      self.placesReturnedFromApi = response.data.results;

    });

  // $http.post('/dishes/places', self.searchPlace)
  //   .then(function(response){
  //     console.log("post finished");
  //     getPlaces();
  //
  //   })

}

self.clickedPlace = function(place){
  console.log(place);
  DataFactory.placeObj = place;


  $location.path('/adddish');
}

}]);
