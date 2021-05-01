// add your dependencies imports here
const mysql = require('mysql');
const express = require('express'); // requiring express in case needed in this file
const nodemailer = require('nodemailer');
require('dotenv').config(); // for the .env
const Cryptr = require('cryptr');
const formattedHTMLInvite = require('./email/invite');

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
const getAllusers = async (_request, response) => {
  console.log('Return all bond users');
  con.query('SELECT * FROM person', (err, result) => {
    // handling any errors
    if (err) throw err;

    response.status(200).json(result);
  });
};

// endpoint to persist users
const createUser = async (request, response) => {
  const {
    body: { uid, name, username, photo, email },
  } = request;

  // pick the user from the database
  con.query(`SELECT * FROM person WHERE uid=${mysql.escape(uid)}`, (err, result) => {
    // handling any errors
    if (err) throw err;
    // if query returned data then just login user
    if (result[0]) {
      console.log('Normal user login => ');
      response.status(200).json([{ status: 'login', message: `${request.body.name} Logged in successfully!` }]);
    } else {
      // if user not in db persist data in the db
      console.log('Persist user => ');
      const query = `INSERT INTO person (uid, name, username, email, photo) VALUES ('${uid}', '${name}', '${username}', '${email}', '${photo}')`;

      con.query(query, () => {
        response
          .status(200)
          .json([{ status: 'signup', message: `${request.body.name} account created successfully!` }]);
      });
    }
  });
};
// end of endpoint to persist users

const sendInvite = async (request, response) => {
  // encripting the sender's email to use in the invite
  const cryptr = new Cryptr('bondkey');
  const {
    params: { email },
  } = request;
  const encryptedEmail = cryptr.encrypt(email);

  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASSWORD,
    },
  });

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"Bond" <foo@example.com>', // sender address
    to: email, // list of receivers
    subject: 'Bond invite❤️', // Subject line
    text: 'Hi there',
    html: formattedHTMLInvite(email, encryptedEmail),
  });

  // decripting to make sure everything is okay!
  const decryptedEmail = cryptr.decrypt(encryptedEmail);
  console.log(`decrypted email => ${decryptedEmail}`);
  console.log('Message sent: %s', info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  response.status(200).json([{ status: 'sent', message: `Bond invite sent successfully to ${email}` }]);
};

module.exports = {
  getAllusers,
  createUser,
  sendInvite,
};
