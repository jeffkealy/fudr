app.controller("FirebaseController", function($firebaseAuth, $http, DataFactory) {
  console.log("firebase controller running");
  var auth = $firebaseAuth();
  var self = this;

  self.currentUser = {};
  self.newUser = {};


  // This code runs whenever the user logs in
  self.logIn = function(){
    auth.$signInWithPopup("google").then(function(firebaseUser) {
    }).catch(function(error) {
      console.log("Authentication failed: ", error);
    });
  };

  // This code runs whenever the user changes authentication states
  // e.g. whevenever the user logs in or logs out
  // this is where we put most of our logic so that we don't duplicate
  // the same things in the login and the logout code
  // auth.$onAuthStateChanged(function(firebaseUser){
  //   // firebaseUser will be null if not logged in
  //   self.currentUser = firebaseUser;
  //   if (firebaseUser == null) {
  //     console.log("Not logged in yet");
  //     DataFactory.firebaseUserName.displayName = "Log In"
  //   } else {
  //     DataFactory.firebaseUserName.displayName = self.currentUser.displayName;
  //   }
  //   if(firebaseUser) {
  //     // This is where we make our call to our server
  //     firebaseUser.getToken().then(function(idToken){
  //       $http({
  //         method: 'GET',
  //         url: '/privateData',
  //         headers: {
  //           id_token: idToken
  //         }
  //       }).then(function(response){
  //         self.secretData = response.data;
  //       });
  //     });
  //   } else {
  //     console.log('Not logged in or not authorized.');
  //     self.secretData = [];
  //   }
  //
  // });

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