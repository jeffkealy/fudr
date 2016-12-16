app.controller('ToolbarController', ['$http', '$mdDialog', "$mdBottomSheet", 'DataFactory', function($http, $mdDialog, $mdBottomSheet, DataFactory){
  var self = this;
  self.firebaseUserName = DataFactory.firebaseUserName
  self.cuisineTypes = DataFactory.cuisineTypesSelected;
  self.menuClick = function(){

    $mdBottomSheet.show({
      templateUrl: "../../views/templates/popups/menu.html",
      controller: 'MenuController as mc',
      parent: angular.element(document.body),
      clickOutsideToClose: false
    })
    .then(function(){
      console.log("cusine types", self.cuisineTypes);
    })

  }
}]);
