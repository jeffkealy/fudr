app.controller('InfopopupController', ['$http', '$mdDialog', 'DataFactory', function($http, $mdDialog, DataFactory){
  console.log("popup controller running");
  var self = this;
  self.currentRestaurant = DataFactory.currentRestaurant
  console.log("info Button Object", self.currentRestaurant);
  self.cancel = function() {
    $mdDialog.cancel();
  };
}]);
