app.controller("FirebaseController", function($firebaseAuth, $http, DataFactory) {
  console.log("firebase controller running");
  var auth = $firebaseAuth();
  var self = this;

  self.currentUser = {};
  self.newUser = {};


  // This code runs whenever the user logs in
  self.logIn = function(){
    auth.$signInWithPopup("google").then(function(firebaseUser) {

      if(firebaseUser) {
        console.log("firebaseUser: ", firebaseUser);
        firebaseUser.user.getToken().then(function(idToken){
          $http({
            method: 'POST',
            url: '/privateData/addUser',
            headers: {
              id_token: idToken
            },
            data: firebaseUser.user
          }).then(function(response){
            console.log("posted");
          });
       });
        //firebaseUser.getToken().then(function(idToken){

        // .catch(function(error) {
        //   console.log("Authentication failed: ", error);
        //   });
      } else {
        console.log('Not logged in or not authorized.');
      }
    })
  };



  self.createUser = function(){
    if(self.currentUser) {
      // This is where we make our call to our server
      self.currentUser.getToken().then(function(idToken){
        $http({
          method: 'POST',
          url: '/privateData',
          headers: {
            id_token: idToken
          },
          data: self.newUser
        }).then(function(response){
          self.newUser = {};
        });
      });
    } else {
      console.log('Not logged in or not authorized.');
      self.secretData = [];
    }
  }

  // This code runs when the user logs out
  self.logOut = function(){
    console.log("log out buttin clicked");
    auth.$signOut().then(function(){
      DataFactory.firebaseUserName.displayName = "Not Log In";
      console.log('Logging the user out!');
    });
  };
});
