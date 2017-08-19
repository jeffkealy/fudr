app.controller('MenuController', ['$http', '$mdDialog', "$mdBottomSheet", 'DataFactory', 'FoodFactory', '$scope', function($http, $mdDialog, $mdBottomSheet, DataFactory, FoodFactory, $scope){
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
      fullscreen: false, // Only for -xs, -sm breakpoints.
      preserveScope: true
    });
  }


  self.closeMenu = function(){


    $mdBottomSheet.hide()
  }

}]);
