
var admin = require("firebase-admin");

var serviceAccount = require("../portfolio-fb.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://portfolio-blog-views.firebaseio.com"
});


module.exports = admin.database()
