app.controller('ToolbarController', ['$http', '$mdDialog', "$mdBottomSheet", 'DataFactory', function($http, $mdDialog, $mdBottomSheet, DataFactory){
  console.log("toolbar controller running");
  var self = this;
  self.firebaseUserName = DataFactory.firebaseUserName
  console.log("Toolbar DataFactory.firebaseUserName" , DataFactory.firebaseUserName);
  self.menuClick = function(){
    console.log("menu Click");

    $mdBottomSheet.show({
      templateUrl: "../../views/templates/popups/menu.html",
      controller: 'MenuController as mc',
      parent: angular.element(document.body)
    })

  }
}]);
