app.controller('MenuController', ['$http', '$mdDialog', "$mdBottomSheet", 'DataFactory',  function($http, $mdDialog, $mdBottomSheet, DataFactory){
  var self = this;
  self.currentDish = DataFactory.currentDish
  self.selected = DataFactory.cuisineTypesSelected;
  self.cuisineTypes = ["African", "American", "Asian", "Brunch", "Caribbean", "Dessert", "Fast Food", "French", "Greek", "Hot Dogs", "Ice Cream", "Indian","Italian", "Latin American", "Mexican", "Pizza", "Sandwiches", "Seafood", "Shushi" , "Spanish"];

  //select None
  self.selectNoneButton = function(){
      self.selected= [];
      DataFactory.cuisineTypesSelected= self.selected;
  }
  //select All
  self.selectAllButton = function(){
      DataFactory.cuisineTypesSelected = DataFactory.cuisineTypes
      self.selected = DataFactory.cuisineTypes;
  }

  //toggle checkboxes
  self.toggle = function(cuisinetype, list){

    var indx = list.indexOf(cuisinetype);
        if (indx > -1) {
          list.splice(indx, 1);
          self.selected = DataFactory.cuisineTypesSelected;
          console.log("unchecked. now:", self.selected);

        }else{
          list.push(cuisinetype);
          self.selected = DataFactory.cuisineTypesSelected;
          console.log("checked. now:", self.selected);

        }
  };
  self.checkBoxes = function(cuisinetype, list){
    return list.indexOf(cuisinetype) > -1;
  }

  //function for when checkboxes are selected
  function cuisineTypeFilter() {
    self.currentDish = {}
    var cuisineTypesSelected = DataFactory.cuisineTypesSelected;
    console.log("DATAfactory cusiine types", DataFactory.cuisineTypesSelected);
    $http({
      method: 'PUT',
      url: 'dishes/filterTypes',
      data: DataFactory.cuisineTypesSelected

    }).then(function(response) {
          self.filterTypesReturnedFromMyDb = response.data;
          console.log("filter types returned", self.filterTypesReturnedFromMyDb);
          DataFactory.filteredDishes = self.filterTypesReturnedFromMyDb

        });
  }


}]);
