const mysql = require('mysql');
const nodemailer = require('nodemailer');
require('dotenv').config();
const Cryptr = require('cryptr');
const formattedHTMLInvite = require('./email/invite');

const con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
});

// endpoint to get all users
const getAllusers = async (request, response) => {
  console.log('Return all bond users');
  con.query('SELECT * FROM person', (err, result) => {
    // handling any errors
    if (err) throw err;

    // mapping through to hide the email and uid of user for security
    const updated = result.map((user) => {
      const { uid, email } = user;

      return {
        ...user,
        uid: uid.toString().replace(/^(.{2})[^@]+/, '$1****'),
        email: email.toString().replace(/^(.{2})[^@]+/, '$1****'),
      };
    });

    response.status(200).json(updated);
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

const sendInvite = async (request, response) => {
  const {
    body: { senderEmail: sender, receiverEmail: receiver },
  } = request;

  const returnVal = {
    message: 'Error Posting request',
    status: 1,
  };

  if (sender === undefined || receiver === undefined || sender.length === 0 || receiver.length === 0) {
    response.status(500).json(returnVal);
    return;
  }

  con.query(`SELECT uid FROM person WHERE email='${receiver}' LIMIT 1`, async (_err, receiverRes) => {
    // check if receiver is not already a user
    if (receiverRes.length > 0) {
      response.status(200).json('This is not an error: if receiver is already a user module');
      return;
    }

    con.query(`SELECT * FROM person WHERE email='${sender}' LIMIT 1`, async (__err, senderRes) => {
      if (senderRes.length === 0) {
        returnVal.status = 2;
        returnVal.message = 'sender email is invalid';
        response.status(500).json(returnVal);
        return;
      }

      // encripting the sender's email to use in the invite
      const cryptr = new Cryptr('bondkey');
      const senderEncryptedEmail = cryptr.encrypt(sender);

      const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_PASSWORD,
        },
      });

      const info = await transporter.sendMail({
        from: '"Bond" <foo@example.com>',
        to: receiver,
        subject: `Bond request from ${senderRes[0].name}`,
        text: 'Hi there',
        html: formattedHTMLInvite(senderRes[0], senderEncryptedEmail),
      });

      // decripting to make sure everything is okay!
      const senderDecryptedEmail = cryptr.decrypt(senderEncryptedEmail);
      console.log(`decrypted email => ${senderDecryptedEmail}`);
      console.log('Message sent: %s', info.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
      response.status(200).json([{ status: 'sent', message: `Bond invite sent successfully to ${receiver}` }]);
    });
  });
};

// endpoint to edit user info
const editUser = async (request, response) => {

  //initialize return object of error
  var returnErr = {
    message: "Invalid Field",
    status: 1
  }

  //initialize person to return to response
  var personReturn = {
    name: request.body.name,
    username: request.body.username,
    photo: request.body.photo
  }

  //checking all fields for null/garbage values 
  if(typeof request.body.name === 'object' ||typeof request.body.username === 'object' ||typeof request.body.uid === 'object'){
    return response.status(500).json(returnErr)
  }

  //not allowing username and name to have special characters
  personReturn.name = request.body.name.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\//\s]/gi, '');
  personReturn.username = request.body.username.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\//\s]/gi, '');

  //checking all fields for empty values
  if(personReturn.name == "" || personReturn.username == "" ||request.body.photo == "" || request.body.uid == ""){
    returnErr.status = 2;
    returnErr.message = "Cannot update profile with empty fields";
    return response.status(500).json(returnErr)
  }
  

  //updating the person info there is no error
  con.query("UPDATE person SET name='"+personReturn.name+"',username='"+personReturn.username+"',photo='"+request.body.photo+"' WHERE uid='"+request.body.uid+"'", function (err, result) {

    //checking if uid exists and profile was updated successfully
    if(result.affectedRows == 0 ){
      returnErr.status = 3;
      returnErr.message = "uid doesnt exist";
      return response.status(500).json(returnErr)
    }

    

    //if successfull
    response.status(200).json(personReturn)
   
    
   })


};


const getOneUser = async (request, response) => {
  //initialize return type of error
  var returnErr = {
    message: "Invalid UID",
    status: 1
  };

  con.query("SELECT * FROM person WHERE uid='"+request.params.uid+"'", function (err, result) {
    //if invalid uid
    if(result== undefined || result.length == 0) {
      response.status(404).json(returnErr)
      return
    }
    result.map((user) => {
      user.uid = user.uid.toString().replace(/^(.{2})[^@]+/, "$1****");
      user.email = user.email.toString().replace(/^(.{2})[^@]+/, "$1****");
    })
    
    //if success
    response.status(200).json(result);  
   });
};



module.exports = {
    getAllusers,
    createUser,
    sendInvite,
    editUser,
    getOneUser
};
