var admin = require("firebase-admin");
var firebaseServiceAccount = "";
var firebaseServices = {
  "type": "service_account",
  "project_id": process.env.project_id,
  "private_key_id": process.env.private_key_id,
  "private_key": process.env.private_key,
  "client_email": process.env.client_email,
  "client_id": process.env.client_id,
  "auth_uri": process.env.auth_uri,
  "token_uri": process.env.token_uri,
  "auth_provider_x509_cert_url": process.env.auth_provider_x509_cert_url,
  "client_x509_cert_url": process.env.client_x509_cert_url
}

if (process.env.project_id != undefined) {
  firebaseServiceAccount = firebaseServices
} else {
  firebaseServiceAccount = "/Users/jeffkealy/Documents/Prime/Fudr/server/firebase-service-account.json";
}


console.log(firebaseServiceAccount);
admin.initializeApp({
  credential: admin.credential.cert(firebaseServiceAccount),
  databaseURL: "https://fudr-26af4.firebaseio.com" // replace this line with your URL
});

/* This is where the magic happens. We pull the id_token off of the request,
verify it against our firebase service account private_key.
Then we add the decodedToken */
var tokenDecoder = function(req, res, next){
  if (req.headers.id_token) {
    admin.auth().verifyIdToken(req.headers.id_token).then(function(decodedToken) {
      // Adding the decodedToken to the request so that downstream processes can use it
      console.log("DECODER: added decoded token");
      req.decodedToken = decodedToken;
      next();
    })
    .catch(function(error) {
      // If the id_token isn't right, you end up in this callback function
      // Here we are returning a forbidden error
      console.log('User token could not be verified');
      res.sendStatus(403);
    });
  } else {
    // Seems to be hit when chrome makes request for map files
    // Will also be hit when user does not send back an idToken in the header
    res.sendStatus(403);
  }
}

module.exports = { token: tokenDecoder };
