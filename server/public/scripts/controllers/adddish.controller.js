app.controller('AdddishController', ['$http', 'DataFactory', function($http, DataFactory){
  console.log("Adddish controller running");
  var self = this;

  self.placeData = DataFactory
  self.placesReturnedFromMyDb = [];
  self.newDish = {

    dishName: "",
    photourl: "",
    cuisinetype: self.selected ,
    factual_id: ""
  };
  self.cuisinetypes = ["African", "American", "Asian", "Breakfast", "Brunch", "Caribbean", "Dessert", "Fast Food", "Greek", "Hot Dogs", "Ice Cream", "Indian", "Italian", "Mexican", "Pizza", "Sandwiches", "Shushi", "Seafood"];
  self.selected = [];
  self.searchedPlace = {}

  //console.log("self.placeData", self.placeData.placeObj); //api restauarant info

  //Get restauarants from
  self.searchPlaces = function(){
    $http.get('/dishes/fromDb')
      .then(function(response) {
        self.placesReturnedFromMyDb = response.data;

    });
  }
  //toggle checkboxes
  self.toggle = function(cuisinetype, list){
    var indx = list.indexOf(cuisinetype);
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
    console.log("self.selectedPlace", self.placeData.placeObj);
    self.newDish.factual_id = self.placeData.placeObj.factual_id
    console.log("new dish after click", self.newDish);
    $http.post('dishes/dish', self.newDish)
      .then(function(response){
        console.log("added Dish");
        self.newDish={};
      })
  }





    //selecet the place to add
    self.clickedPlace = function(place){
      console.log("clicked place", place);
      DataFactory.placeObj = place;


    }

}]);
