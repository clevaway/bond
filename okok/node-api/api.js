// add your dependencies imports here
const mysql = require('mysql');
const express = require('express'); // requiring express in case needed in this file
const nodemailer = require('nodemailer');
require('dotenv').config() // for the .env 
const Cryptr = require('cryptr');

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
  con.query("SELECT * FROM person", function (err, result) {
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

  var returnVal = {
                    message: "Error Posting request",
                    status: 1
                  }

  var sender = request.body.senderEmail;
  var receiver = request.body.receiverEmail;
                  
        // function that holds the formatted html invite
        // sender is the object of the person sending the invite. gotten from the db
        formattedHTMLInvite = (sender, senderEncryptedEmail) =>{
        
          let templete = `
          <!doctype html>
          <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
            <head>
              <title>
              </title>
              <meta http-equiv="X-UA-Compatible" content="IE=edge">
              <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1">
              <style type="text/css">
              .circular-img img
                {
                  height: 70px;
                  border: 3px solid #FD4D4D;
                  border-radius: 100px;
                }

                #outlook a{padding: 0;}
                      .ReadMsgBody{width: 100%;}
                      .ExternalClass{width: 100%;}
                      .ExternalClass *{line-height: 100%;}
                      body{margin: 0; padding: 0; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;}
                      table, td{border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;}
                      img{border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic;}
                      p{display: block; margin: 13px 0;}
              </style>
              <!--[if !mso]><!-->
              <style type="text/css">
                @media only screen and (max-width:480px) {
                            @-ms-viewport {width: 320px;}
                            @viewport {	width: 320px; }
                        }
              </style>
              <!--<![endif]-->
              <!--[if mso]> 
              <xml> 
                <o:OfficeDocumentSettings> 
                  <o:AllowPNG/> 
                  <o:PixelsPerInch>96</o:PixelsPerInch> 
                </o:OfficeDocumentSettings> 
              </xml>
              <![endif]-->
              <!--[if lte mso 11]> 
              <style type="text/css"> 
                .outlook-group-fix{width:100% !important;}
              </style>
              <![endif]-->
              <style type="text/css">
                @media only screen and (min-width:480px) {
                .dys-column-per-90 {
                  width: 90% !important;
                  max-width: 90%;
                }
                }
              </style>
            </head>
            <body>
              <div>
                <table align='center' border='0' cellpadding='0' cellspacing='0' role='presentation' style='background:#f7f7f7;background-color:#f7f7f7;width:100%;'>
                  <tbody>
                    <tr>
                      <td>
                        <div style='margin:0px auto;max-width:600px;'>
                          <table align='center' border='0' cellpadding='0' cellspacing='0' role='presentation' style='width:100%;'>
                            <tbody>
                              <tr>
                                <td style='direction:ltr;font-size:0px;padding:20px;text-align:center;vertical-align:top;'>
                                  <!--[if mso | IE]>
                                <table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td style="vertical-align:top;width:540px;">
                                <![endif]-->
                                  <div class='dys-column-per-90 outlook-group-fix' style='direction:ltr;display:inline-block;font-size:13px;text-align:left;vertical-align:top;width:100%;'>
                                    <table border='0' cellpadding='0' cellspacing='0' role='presentation' width='100%'>
                                      <tbody>
                                        <tr>
                                          <td style='background-color:#ffffff;border:1px solid #ccc;padding:50px 15px;vertical-align:top;'>
                                            <table border='0' cellpadding='0' cellspacing='0' role='presentation' style='' width='100%'>
                                              <tr>
                                                <td align='center' style='font-size:0px;padding:10px 25px;word-break:break-word;'>
                                                  <div style='color:#777777;font-family:Oxygen, Helvetica neue, sans-serif;font-size:14px;line-height:21px;text-align:center;'>
                                                    <center>
                                                      <span class="circular-img">
                                                        <img src="`+sender.photo+`"/>
                                                        </span><br/>
                                                      <span>`+sender.name+`</span><br/>
                                                      <span>`+sender.email+`</span>
                                                    </center>
                                                    <br/>
                                                  <span>
                                                    Hey, <b>`+sender.name+`</b> would like to bond with you. Please click the button below to bond now.
                                                      <br />
                                                      <br />
                                                    </span>
                                                    <span style='font-weight:700; color: #ff6f6f; font-size: 18px;'>
                                                      Bond
                                                    </span>
                                                    <span>
                                                      Community
                                                    </span>
                                                  </div>
                                                </td>
                                              </tr>
                                              <tr>
                                                <td align='center' style='font-size:0px;padding:10px 25px;word-break:break-word;'>
                                                  <div style='color:#777777;font-family:Oxygen, Helvetica neue, sans-serif;font-size:14px;line-height:21px;text-align:center;'>
                                                    <p style='padding: 10px 0; border: 1px solid #cccccc; color: #4d4d4d; font-weight: bold; font-size: 18px; text-align: center;'>
                                                      Te amo
                                                    </p>
                                                  </div>
                                                </td>
                                              </tr>
                                              <tr>
                                                <td align='center' style='font-size:0px;padding:10px 25px;word-break:break-word;' vertical-align='middle'>
                                                  <table border='0' cellpadding='0' cellspacing='0' role='presentation' style='border-collapse:separate;line-height:100%;'>
                                                    <tr>
                                                        <td align='center' bgcolor='#ff6f6f' role='presentation' style='background-color:#ff6f6f;border:none;border-radius:5px;cursor:auto;padding:10px 25px;' valign='middle'>
                                                          <a href='http://bond-nu.vercel.app/accept?bondkey=`+senderEncryptedEmail+`' style='background:#ff6f6f;color:#ffffff;font-family:Oxygen, Helvetica neue, sans-serif;font-size:14px;font-weight:400;line-height:21px;margin:0;text-decoration:none;text-transform:none;' target='_blank'>
                                                          Bond now!
                                                          </a>
                                                        </td>
                                                    </tr>
                                                  </table>
                                                </td>
                                              </tr>
                                            </table>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                  <!--[if mso | IE]>
                                </td></tr></table>
                                <![endif]-->
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </body>
          </html>
          `
        
          return templete
        }
        // end of function that holds the formatted html invite
  


  //guard clause incase of null parameters
  if(sender == undefined || receiver == undefined) response.status(500).json(returnVal);

  con.query("SELECT uid FROM person WHERE email='"+receiver+"' LIMIT 1", async (err,receiverRes) => {
     
    // check if receiver is not already a user
    if(receiverRes.length == 0){

      con.query("SELECT * FROM person WHERE email='"+sender+"' LIMIT 1", async (err,senderRes) => {  
        //check if somehow sender email is invalid
        if(senderRes.length == 0) {  
            returnVal.status = 2;
            returnVal.message = "sender email is invalid"
            response.status(500).json(returnVal);
        }


      // encripting the sender's email to use in the invite
      const cryptr = new Cryptr('bondkey');
      const senderEncryptedEmail = cryptr.encrypt(sender);

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
        to: receiver, // list of receivers
        subject: "Bond request from "+senderRes[0].name, // Subject line
        text: 'Hi there',
        html: formattedHTMLInvite(senderRes[0], senderEncryptedEmail)
      
      });
      // decripting to make sure everything is okay!
      const senderDecryptedEmail = cryptr.decrypt(senderEncryptedEmail);
      console.log("decrypted email =>"+senderDecryptedEmail)
      console.log("Message sent: %s", info.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
      response.status(200).json({status: 'sent', message: 'Bond invite sent successfully to '+receiver}); 

    })

  }else{
    //if reciever is already a user
    response.status(200).json("This is not an error: if receiver is already a user module")

  }
  
})

}

//end of send Invite Button


module.exports = {
    getAllusers,
    createUser,
    sendInvite
};
