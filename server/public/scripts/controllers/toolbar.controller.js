app.controller('ToolbarController', ['$http', '$mdDialog', "$mdBottomSheet", function($http, $mdDialog, $mdBottomSheet){
  console.log("toolbar controller running");
  var self = this;
  self.menuClick = function(){
    console.log("menu Click");
    $mdBottomSheet.show({
      templateUrl: "../../views/templates/popups/menu.html",
      controller: 'MenuController as mc',
      parent: angular.element(document.body)
    })

  }
}]);
