const express = require('express');
const app = express();
const mysql = require('mysql');
require('dotenv').config();

const con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
});

con.connect((err) => {
  if (err) throw err;

  console.log('Connected to db!');
  // setting the port of the process or a default port
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`listening on port: ${port}`);
  });

});
