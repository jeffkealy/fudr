app.controller('YumreviewpopupController', ['$http', '$mdDialog','DataFactory', function($http, $mdDialog, DataFactory){
  console.log("popup controller running");
  var self = this;
  self.yums = DataFactory.yums;
  self.currentRestaurant = DataFactory.currentRestaurant;
  console.log("yum review", self.yums);
  self.cancel = function() {
    $mdDialog.cancel();
  };
}]);
