const express = require('express');

const app = express();
const cors = require('cors');
const api = require('./api');
// enabling CORS to accept from all origins
app.use(cors());
// express.json() and express.urlencoded() are built-in middleware functions to support JSON-encoded and URL-encoded bodies.
// to be able to get object data from the url
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// enabling CORS to accept from all origins
app.all('*', (req, res, next) => {
  console.log(`${new Date()} - request for ${req.path}`);
  res.set('Access-Control-Allow-Origin', '*');
  next();
});

// the various endpoints
app.get('/', (req, res) => {
  res.send('welcome to the bond-api endpoint.');
});

// calling for implimentation of getting all users
app.get('/users', api.getAllusers);

// sending bond invite
app.post('/sendInvite', api.sendInvite);

// persist user data in db to create a new user
app.post('/user', api.createUser);

// post request to edit user info
app.post('/editUser',api.editUser);

// setting the port of the process or a default port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on port: ${port}`);
});
