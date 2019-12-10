// Import the express lirbary
const express = require("express");
const axios = require("axios");
// Create a new express application and use
// the express static middleware, to serve all files
// inside the public directory
//
const clientID = "598fcc05a2cb9bf58415";
const clientSecret = "8ac1d5751cf294f611e5dfd0d4ff0e1f59d537e9";

const app = express();
app.use(express.static(__dirname + "/public"));

// Start the server on port 8080
app.listen(8080, () => console.log("listening on 8080"));
