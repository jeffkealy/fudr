app.controller('FilterpopupController', ['$mdDialog', 'DataFactory','FoodFactory', '$scope', '$rootScope','$mdBottomSheet',   function($mdDialog, DataFactory, FoodFactory, $scope, $rootScope, $mdBottomSheet){
  var self = this;
  self.currentDish = DataFactory.currentDish
  self.selected = DataFactory.cuisineTypesSelected;
  self.cuisineTypes = DataFactory.cuisineTypes.slice();


  //select None
  self.selectNoneButton = function(){
      self.selected= [];
      DataFactory.cuisineTypesSelected= self.selected;
  }
  //select All
  self.selectAllButton = function(){
    // DataFactory.cuisineTypesSelected = DataFactory.cuisineTypes
    self.selected = DataFactory.cuisineTypes.slice();
    DataFactory.cuisineTypesSelected = DataFactory.cuisineTypes.slice()


    console.log("self.selected", self.selected);
    console.log("DataFactory.cuisineTypesSelected", DataFactory.cuisineTypesSelected);
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
          DataFactory.filteredDishes = self.filterTypesReturnedFromMyDb;

        });
  }
  $scope.childmethod = function(){
    console.log("childmethod");
    $rootScope.$broadcast("callParentMethod", {});
  }
  //clicking the Ok button on the filter popup
  self.okButton = function() {
    console.log("Filter OK Clicked");
    $mdDialog.hide({});
    $scope.childmethod();

  };

}]);
