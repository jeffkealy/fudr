app.controller('AdddishController', ['$http', 'DataFactory', function($http, DataFactory){
  console.log("Adddish controller running");
  var self = this;
  self.placeData = DataFactory
  self.newDish = {

    dishName: "",
    photourl: "",
    cuisinetype: [],
    factual_id: self.placeData.placeObj
  };
  self.cuisinetypes = ["African", "American", "Asian", "Breakfast", "Brunch"];
  self.selected = [];
  self.placesReturnedFromMyDb = [];
  self.searchPlace = {}

  //get places from my DB request
  var urlId = '?name=';
  urlId += self.searchPlace.restaurant;

  console.log("urlid", urlId);
  self.searchPlaces = function(){
    console.log("search places clicked");
    var urlId = '?name=';
    urlId += self.searchPlace.restaurant;
    console.log(urlId);
    $http.get('/dishes/fromDb'+ urlId)
      .then(function(response) {
        console.log(response.data);
        self.placesReturnedFromMyDb = response.data;

    });

  }

  //selecet the place to add
  self.clickedPlace = function(place){
    console.log(place);
    DataFactory.placeObj = place;
    $http.post('/dishes/restaurant', place)
      .then(function(response){
        $location.path('/adddish');
      })

  }


  console.log("self.newDish", self.newDish);
  console.log("self.placeData", self.placeData.placeObj); //api restauarant info
  console.log(DataFactory);
  //self.newDish.dish[0].cuisinetype = "Brunch"


  self.toggle = function(cuisinetype, list){
    console.log("cuisinetype", cuisinetype);
    var indx = list.indexOf(cuisinetype);
      console.log("indx", indx);
        if (indx > -1) {
          list.splice(indx, 1);
        }else{
          list.push(cuisinetype);
        }
  };
  self.checkBoxes = function(cuisinetype, list){
    return list.indexOf(cuisinetype) > -1;
  }


  self.addDish = function(){
    self.newDish.cuisinetype = self.selected
    DataFactory
    console.log("new dish after click", self.newDish);
  }


}]);
