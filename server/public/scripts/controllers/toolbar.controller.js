app.controller('ToolbarController', ['$http', '$mdDialog', "$mdBottomSheet", 'DataFactory', '$firebaseAuth', function($http, $mdDialog, $mdBottomSheet, DataFactory, $firebaseAuth){
  var self = this;
  self.firebaseUserName = DataFactory.firebaseUserName
  self.cuisineTypes = DataFactory.cuisineTypesSelected;
  var auth = $firebaseAuth();

  //Menu button click. opens bottom sheet menu
  self.menuClick = function(){
    $mdBottomSheet.show({
      templateUrl: "../../views/templates/popups/menu.html",
      controller: 'MenuController as mc',
      parent: angular.element(document.body),
      clickOutsideToClose: true
    })


  }

  //log in when click on name.
  self.logIn = function(){
    auth.$signInWithPopup("google").then(function(firebaseUser) {
    }).catch(function(error) {
      console.log("Authentication failed: ", error);
    });
  };
}]);
