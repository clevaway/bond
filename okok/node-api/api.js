const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');
const nodemailer = require('nodemailer');
const sgTransport = require('nodemailer-sendgrid-transport');
require('dotenv').config();

//utilizes the body-parser package
app.use(express.urlencoded());

//need for body parser
app.use(express.json());

//mailing options
const options = {
  auth: {
  //  api_user: process.env.SENDGRID_USERNAME,
    api_key: process.env.SENDGRID_API_KEY
  }
}

const client = nodemailer.createTransport(sgTransport(options));



// connection data
const con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});
//start connection to db
con.connect();

// endpoint to get all users
const getAllusers = async (request, response) => {
  con.query("SELECT * FROM person", function (err, result) {
    if (err) throw err;
    console.log(result)
    response.status(200).json(result)
    });
};

//send Invite Button
const sendInvite = async (request, response) => {
    con.query("SELECT * FROM person where email='"+request.params.email+"' ", function (err, result) {
      var ret = 0;

      if (err) throw err;
      if (request.params.email == undefined) return

      if(result.length == 0){
        var email = {
          from: 'josephjunejoeee@gmail.com',
          to: request.params.email,
          subject: 'Hello',
          text: 'Hello world',
          html: '<h1><b>Bond with {session.name}</b></h1><h3>A friend wants to bond with you, Download and install Bond now to bond with your loved ones.</h3></br></br><h3>Click the link below to bond now.</h3></br><h3>https://bond-nu.vercel.app/</h3>'
        };

        client.sendMail(email, function(err, info){
          if (err) throw err;
          ret = 1;
          console.log('Message sent: ' + info.response);  
        });

      }else{
        //send invite to already user
      }

      response.status(200).json(ret);
      });
  };

module.exports = {
    getAllusers,
    sendInvite
};