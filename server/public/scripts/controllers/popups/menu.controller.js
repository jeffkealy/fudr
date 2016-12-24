app.controller('MenuController', ['$http', '$mdDialog', "$mdBottomSheet", 'DataFactory',  function($http, $mdDialog, $mdBottomSheet, DataFactory){
  var self = this;
  
  //favorites button. pop-up favorites
  self.favoritesButton = function(ev){
    $mdDialog.show({
      controller: 'FavoritespopupController as fp',
      templateUrl: '../../views/templates/popups/favoritespopup.html',
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: self.customFullscreen // Only for -xs, -sm breakpoints.
    });
  }

  //pop up for filter on sm and xs breakpoints
  self.filterButton = function(ev){
    $mdDialog.show({
      controller: 'FilterpopupController as filterc',
      templateUrl: '../../views/templates/popups/filterpopup.html',
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: self.customFullscreen // Only for -xs, -sm breakpoints.
    });
  }

  // self.currentDish = DataFactory.currentDish
  // self.selected = DataFactory.cuisineTypesSelected;
  // self.cuisineTypes = DataFactory.cuisineTypes;
  //
  // //select None
  // self.selectNoneButton = function(){
  //     self.selected= [];
  //     DataFactory.cuisineTypesSelected= self.selected;
  // }
  // //select All
  // self.selectAllButton = function(){
  //     DataFactory.cuisineTypesSelected = DataFactory.cuisineTypes
  //     self.selected = DataFactory.cuisineTypes;
  // }
  //
  // //toggle checkboxes
  // self.toggle = function(cuisinetype, list){
  //
  //   var indx = list.indexOf(cuisinetype);
  //       if (indx > -1) {
  //         list.splice(indx, 1);
  //         self.selected = DataFactory.cuisineTypesSelected;
  //         console.log("unchecked. now:", self.selected);
  //
  //       }else{
  //         list.push(cuisinetype);
  //         self.selected = DataFactory.cuisineTypesSelected;
  //         console.log("checked. now:", self.selected);
  //
  //       }
  // };
  // self.checkBoxes = function(cuisinetype, list){
  //   return list.indexOf(cuisinetype) > -1;
  // }
  //
  // //function for when checkboxes are selected
  // function cuisineTypeFilter() {
  //   self.currentDish = {}
  //   var cuisineTypesSelected = DataFactory.cuisineTypesSelected;
  //   console.log("DATAfactory cusiine types", DataFactory.cuisineTypesSelected);
  //   $http({
  //     method: 'PUT',
  //     url: 'dishes/filterTypes',
  //     data: DataFactory.cuisineTypesSelected
  //
  //   }).then(function(response) {
  //         self.filterTypesReturnedFromMyDb = response.data;
  //         console.log("filter types returned", self.filterTypesReturnedFromMyDb);
  //         DataFactory.filteredDishes = self.filterTypesReturnedFromMyDb
  //
  //       });
  // }



}]);
