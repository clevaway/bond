const mysql = require('mysql');
require('dotenv').config()

// connection data
const con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,

});

// endpoint to get all users
const getAllusers = async (request, response) => {
  con.query("SELECT * FROM person", function (err, result) {
    if (err) throw err;
       response.status(200).json(result)  
    });
};

module.exports = {
    getAllusers
};