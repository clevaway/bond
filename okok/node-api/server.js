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
app.all("*", (req, res, next) => {
  console.log(`${new Date()} - request for ${req.path}`);
  res.set("Access-Control-Allow-Origin", "*");
  next();
});

// the various endpoints
app.get("/", (req, res) => {
  res.send("welcome to the bond-api endpoint.");
});

// calling for implimentation of getting all users
app.get('/users', api.getAllusers);

// persist user data in db to create a new user
app.post('/user', api.createUser);

// setting the port of the process or a default port 
app.listen(process.env.PORT || 3000, function(){
    console.log('listening on port: 3000');
});