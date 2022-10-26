// Import the express lirbary
require("dotenv").config();

const cors = require("cors");
const express = require("express");
const axios = require("axios");
// Create a new express application and use
// the express static middleware, to serve all files
// inside the public directory
//
const clientID = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const redirect_to_url = process.env.REDIRECT_TO_URL || "/welcome.html";
const redirectUri =
  process.env.REDIRECT_URI || "http://localhost:8080/oauth/redirect";
const PORT = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.options("*", cors());

app.use(express.static(__dirname + "/public"));
app.set("views", __dirname + "/public/views");
app.set("view engine", "pug");

app.get("/", (_, res) => {
  res.render("./index.pug", { clientID, redirectUri });
});

// Declare the redirect route
app.get("/oauth/redirect", (req, res) => {
  // The req.query object has the query params that
  // were sent to this route. We want the `code` param
  const requestToken = req.query.code;
  axios({
    // make a POST request
    method: "post",
    // to the Github authentication API, with the client ID, client secret
    // and request token
    url: `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${requestToken}`,
    // Set the content type header, so that we get the response in JSOn
    headers: {
      accept: "application/json",
    },
  })
    .then((response) => {
      // Once we get the respons extract the access token from
      // the response body
      const accessToken = response.data.access_token;
      // redirect the user to the welcome page, along with the access token
      res.redirect(`${redirect_to_url}/${accessToken}`);
    })
    .catch((error) => {
      console.error("error", error);
    });
});

app.get("/api/user/:access_token", (req, res) => {
  const accessToken = req.params.access_token;
  axios({
    method: "get",
    url: "https://api.github.com/user",
    headers: {
      Authorization: `token ${accessToken}`,
    },
  })
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
});

app.listen(PORT, () => {
  console.log("dirname ", __dirname);
  console.log("redirect to url ", redirect_to_url);
  console.log("redirect uri ", redirectUri);
  console.log("listening on", PORT);
  console.log("client_secret ", clientSecret);
  console.log("client_id", clientID);
});
