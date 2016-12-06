app.controller('HomeController', ['$http', function($http){
  console.log("home controller is up");
  var key = 'AIzaSyBiMubXEKljXk7iYHzhz76eeOwMgcaIpKM'
  var self = this;
  self.dish = {};
  self.yums = {};
  self.naw = {}

  self.yumButton = function(){
    console.log("clicked the Yum button");
  }

}]);
