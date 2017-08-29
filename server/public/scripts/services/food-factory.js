angular.module('myApp')
.factory('FoodFactory', ['$http', 'DataFactory', foodFactory]);

function foodFactory($http, DataFactory){
  var dishes = {
    allDishes: null
  };



  //get dishes all dishes function
  function getDishes(){
    console.log("getting dishes in factory");
    return $http({
      method: 'GET',
      url: '/dishes/dishes'
    })
      .then(setDishes)
      .catch( function handleError(err) {
        console.log(err.data);
      });

    function setDishes(response){
      DataFactory.dishes = response.data
      cuisineTypeFilter()
      return DataFactory.dishes
    }
  }

  //filter results
  function cuisineTypeFilter(){
    DataFactory.filteredResults = [];
    for (var i = 0; i < DataFactory.dishes.length; i++) {
      var addToFilteredList = false;
      for (var j = 0; j < DataFactory.dishes[i].cuisinetype.length; j++) {
        for (var k = 0; k < DataFactory.cuisineTypesSelected.length; k++) {
          if (DataFactory.dishes[i].cuisinetype[j]== DataFactory.cuisineTypesSelected[k]) {
            addToFilteredList = true;
          }
        }
      }
      if( addToFilteredList == true){

        DataFactory.filteredResults.push(DataFactory.dishes[i]);
      }
    }
    DataFactory.dishes =  DataFactory.filteredResults
    console.log("cuisineTypeFilter", DataFactory.dishes);

    return getRandomDish();

  }

  //get a random dish
  function getRandomDish(){
    DataFactory.randomNumber = randomNumberGen(0, DataFactory.dishes.length-1)
    DataFactory.currentDish = DataFactory.dishes[DataFactory.randomNumber];
    console.log("current Dish", DataFactory.currentDish);
    getRestaurant();
    return DataFactory.currentDish
  }


  //get current restaurant assisiated with dish id from DB
  function getRestaurant(){
    return $http.get('/dishes/currentRestaurantfromDb/' + DataFactory.currentDish.restaurant_id )
      .then(function(response) {
        DataFactory.currentRestaurant = response.data;
        DataFactory.currentDish.currentRestaurant = DataFactory.currentRestaurant;
        console.log("CURRENT REST", DataFactory.currentDish.currentRestaurant);
      });
  }

  //function to generate a random number
  function randomNumberGen(min, max){
      return Math.floor(Math.random() * (1 + max - min) + min);
  }
  //fucntion to do scope.apply on home controller
  function scopeApplyOnHc(){
    console.log("scope.apply");
  }

  return {
    factory:
    {
      dishes: dishes,
      getDishes: function(){
      return getDishes();
      },
      cuisineTypeFilter: function(){
      return cuisineTypeFilter();
      },
      getRandomDish: function(){
      return getRandomDish();
      },
      getRestaurant: function(){
      return getRestaurant();
      },
      scopeApplyOnHc: function(){
      return scopeApplyOnHc();
      }
    }
  }
}
