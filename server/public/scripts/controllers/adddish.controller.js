app.controller('AdddishController', ['$http', 'DataFactory', function($http, DataFactory){
  console.log("Adddish controller running");
  var self = this;
  self.placesReturnedFromMyDb = [];
  self.newDish = {

    dishName: "",
    photourl: "",
    cuisinetype: self.selected ,
    factual_id: "",
    restaurant_id: ""
  };
  self.cuisinetypes = ["African", "American", "Asian", "Brunch", "Caribbean", "Dessert", "Fast Food", "French", "Greek", "Hot Dogs", "Ice Cream", "Indian", "Italian", "Latin American", "Mexican", "Pizza", "Sandwiches", "Seafood", "Shushi" , "Spanish"];
  self.selected = [];
  self.searchedPlace = {}
  self.placeData = DataFactory.place


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
    console.log("DataFactory place", DataFactory.currentRestaurant._id);
    self.newDish.cuisinetype = self.selected
    self.newDish.factual_id = DataFactory.place.factual_id;
    self.newDish.restaurant_id = DataFactory.currentRestaurant._id;
    console.log("new dish after click", self.newDish);
    console.log("you stopped the post call because you need to fix restaurant_id");
    $http.post('dishes/dish', self.newDish)
      .then(function(response){
        console.log("added Dish");
        self.newDish={};
      })
  }


    //selecet the place to add
    self.clickedPlace = function(place){

      DataFactory.place = place;
      self.placeData = DataFactory.place;
      console.log("clicked place", self.placeData);


    }

}]);
