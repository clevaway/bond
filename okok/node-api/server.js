"use strict";
// Importing express
const express = require('express');
const app = express();
const api = require('./api'); //importing the api

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


// setting the port of the process or a default port 
app.listen(process.env.PORT || 3000, function(){
    console.log('listening on port: 3000');
});