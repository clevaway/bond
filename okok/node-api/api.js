// add your dependencies imports here
const mysql = require('mysql');
const express = require('express'); // requiring express in case needed in this file
const nodemailer = require('nodemailer');
require('dotenv').config() // for the .env 

// do not add any dependency import below this line

// database connection credentials
const con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,

});
// end of database connection credentials


// endpoint to get all users
const getAllusers = async (request, response) => {
    console.log("Return all bond users")
  con.query("SELECT * FROM person LIMIT 10", function (err, result) {
     // handling any errors
    if (err) throw err;
       response.status(200).json(result)  
    });
};

// endpoint to persist users
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
// end of endpoint to persist users



//send Invite Button
const sendInvite = async (request, response) => {

  // create reusable transporter object using the default SMTP transport
  var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD
    }
    });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Bond" <foo@example.com>', // sender address
    to: request.params.email, // list of receivers
    subject: "Bond invite❤️", // Subject line
    text: 'Hi there',
    html: '<h1><b>Bond with '+request.params.email+'</b></h1><h3>A friend wants to bond with you, Download and install Bond now to bond with your loved ones.</h3></br></br><h3>Click the link below to bond now.</h3></br><h3>https://bond-nu.vercel.app/bond/</h3>'
  
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  response.status(200).json([{status: 'sent', message: 'Bond invite sent successfully to '+request.params.email}]); 

  
};
//end of send Invite Button


module.exports = {
    getAllusers,
    createUser,
    sendInvite
};