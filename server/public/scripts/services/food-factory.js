angular.module('myApp')
.factory('FoodFactory', ['$http', foodFactory]);

function foodFactory($http){



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
      dishes.allDishes = response.data
      console.log("get dishes done", dishes);
      return dishes
    }
  }


  return {
    factory:
    {
      dishes: dishes,
      getDishes: function(){
      return getDishes();
      }
    }
  }
}
