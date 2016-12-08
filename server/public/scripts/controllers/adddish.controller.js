app.controller('AdddishController', ['$http', 'DataFactory', function($http, DataFactory){
  console.log("Adddish controller running");
  var self = this;
  self.placeData = DataFactory
  self.newDish = {

    dishName: "",
    photourl: "",
    cuisinetype: []
  };
  console.log("self.newDish", self.newDish);
  console.log("self.placeData", self.placeData.placeObj);
  console.log(DataFactory);
  //self.newDish.dish[0].cuisinetype = "Brunch"
  self.cuisinetypes = ["African", "American", "Asian", "Breakfast", "Brunch"];
  self.selected = [];

  self.toggle = function(cuisinetype, list){
    console.log("cuisinetype", cuisinetype);
    var indx = list.indexOf(cuisinetype);
      console.log("indx", indx);
        if (indx > -1) {
          list.splice(indx, 1);
        }else{
          list.push(cuisinetype);
        }
  };
  self.checkBoxes = function(cuisinetype, list){
    return list.indexOf(cuisinetype) > -1;
  }


  self.addDish = function(){
    self.newDish.cuisinetype = self.selected
    DataFactory
    console.log("new dish after click", self.newDish);
  }


}]);
