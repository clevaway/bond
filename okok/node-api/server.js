"use strict";
// Importing express
const express = require('express');
const app = express();
const api = require('./api'); //importing the api

// express.json() and express.urlencoded() are built-in middleware functions to support JSON-encoded and URL-encoded bodies.
// to be able to get object data from the url
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// enabling CORS to accept from all origins
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// the various endpoints
app.get("/", (req, res) => {
  res.send("welcome to the bond-api endpoint.");
});

// calling for implimentation of getting all users
app.get('/users', api.getAllusers);


// sending bond invite
app.post('/sendInvite', api.sendInvite);

// persist user data in db to create a new user
app.post('/user', api.createUser);


// setting the port of the process or a default port 
app.listen(process.env.PORT || 3000, function(){
    console.log('listening on port: 3000');
});
