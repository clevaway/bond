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
    console.log("Return all bond users")
  con.query("SELECT * FROM person", function (err, result) {
     // handling any errors
    if (err) throw err;
       response.status(200).json(result)  
    });
};

// endpoint to get all users
const createUser = async (request, response) => {
    const uid = request.body.uid;
    const name = request.body.name;
    const username =  request.body.username;
    const photo = request.body.photo;
    const email = request.body.email;

    // pick the user from the database
    con.query("SELECT * FROM person WHERE uid="+ mysql.escape(uid), function (err, result) {
        // handling any errors
        if (err) throw err;
            // if query returned data then just login user
            if(result[0]){
                console.log("Normal user login => ");
                response.status(200).json([{status: 'login', message: request.body.name+' Logged in successfully!'}]); 
            }else{
                // if user not in db persist data in the db
                console.log("Persist user => ");
                con.query("INSERT INTO person (uid, name, username, email, photo) VALUES ('"+uid+"','"+name+"','"+username+"','"+email+"','"+photo+"')", function (err, result) {
                    response.status(200).json([{status: 'signup', message: request.body.name+' account created successfully!'}]); 
 
                });
            }
        });
};

module.exports = {
    getAllusers,
    createUser
};