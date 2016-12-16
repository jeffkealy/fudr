app.controller('MenuController', ['$http', '$mdDialog', "$mdBottomSheet", 'DataFactory', function($http, $mdDialog, $mdBottomSheet, DataFactory){
  var self = this;
  self.currentDish = DataFactory.currentDish
  self.selected = DataFactory.cuisineTypesSelected;

  self.cuisineTypes = ["African", "American", "Asian", "Brunch", "Caribbean", "Dessert",
                      "Fast Food", "French", "Greek", "Hot Dogs", "Ice Cream", "Indian",
                      "Italian", "Latin American", "Mexican", "Pizza", "Sandwiches", "Seafood", "Shushi" , "Spanish"];
  //toggle checkboxes
  self.toggle = function(cuisinetype, list){
    var indx = list.indexOf(cuisinetype);
        if (indx > -1) {
          list.splice(indx, 1);
          self.selected = DataFactory.cuisineTypesSelected;
          console.log("Total selected", DataFactory.cuisineTypesSelected);


        }else{
          list.push(cuisinetype);
          self.selected = DataFactory.cuisineTypesSelected;
          console.log("Total selected", DataFactory.cuisineTypesSelected);

        }
  };
  self.checkBoxes = function(cuisinetype, list){
    return list.indexOf(cuisinetype) > -1;
  }




}]);
