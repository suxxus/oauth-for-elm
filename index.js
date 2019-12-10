// Import the express lirbary
const cors = require("cors");
const express = require("express");
const axios = require("axios");
// Create a new express application and use
// the express static middleware, to serve all files
// inside the public directory
//
const clientID = "";
const clientSecret = "";

const app = express();
app.use(cors());
app.options('*', cors());
app.use(express.static(__dirname + "/public"));

// Declare the redirect route
app.get('/oauth/redirect', (req, res) => {
  // The req.query object has the query params that
  // were sent to this route. We want the `code` param
  const requestToken = req.query.code
  axios({
    // make a POST request
    method: 'post',
    // to the Github authentication API, with the client ID, client secret
    // and request token
    url: `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${requestToken}`,
    // Set the content type header, so that we get the response in JSOn
    headers: {
         accept: 'application/json'
    }
  }).then((response) => {
    // Once we get the response, extract the access token from
    // the response body
    const accessToken = response.data.access_token
    // redirect the user to the welcome page, along with the access token
    res.redirect(`/welcome.html?access_token=${accessToken}`)
  })
})




// Start the server on port 8080
app.listen(8080, () => console.log("listening on 8080"));
