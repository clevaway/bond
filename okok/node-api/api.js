const mysql = require('mysql');
const nodemailer = require('nodemailer');
require('dotenv').config();
const Cryptr = require('cryptr');
const formattedHTMLInvite = require('./email/invite');
const { v4: uuidv4 } = require('uuid')

const con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
});

// endpoint to get all users
const getAllusers = async (request, response) => {
  //initialize return fields incase of error
  var returnErr = {
    message: "Invalid UID",
    status: 1
  };
  //check wether a query is present
  if(Object.keys(request.query).length === 0){
  con.query('SELECT * FROM person', (err, result) => {
    // handling any errors
    if (err) throw err;

    response.status(200).json(result);
  });
}else{
  //check if query variable name is "uid"
  if(request.query.uid != null){
    con.query("SELECT * FROM person WHERE uid='"+request.query.uid+"' LIMIT 1", function (err, result) {
      //if invalid uid
      if(result== undefined || result.length == 0) {
        response.status(404).json(returnErr)
        return
      }

      //if success
      return response.status(200).json(result);  
    })
  }else{
    //if variable not "uid"
    returnErr.status = 2
    returnErr.message = "Could not handle that request"
    response.status(500).json(returnErr)
  }
  
}
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

  if (sender === undefined || receiver === undefined || sender.length === 0 || receiver.length === 0 ||typeof sender === 'object' ||typeof receiver === 'object') {
    response.status(500).json(returnVal);
    return;
  }


    con.query(`SELECT * FROM person WHERE email='${sender}' LIMIT 1`, async (__err, senderRes) => {
      if (senderRes.length === 0) {
        returnVal.status = 2;
        returnVal.message = 'Sender email is invalid';
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
    uid : request.body.uid,
    username: request.body.username,
    photo: request.body.photo
  }

  //checking all fields for null/garbage values 
  if(typeof request.body.username === 'object' ||typeof request.body.uid === 'object'||typeof request.body.photo === 'object'){
    return response.status(500).json(returnErr)
  }

  //not allowing username to have special characters
  personReturn.username = request.body.username.replace(/[`~!@#$%^&*()|+\-=?;:'",.<>\{\}\[\]\\\//\s]/gi, '');

  //checking all fields for empty values
  if(personReturn.username == "" ||request.body.photo == "" || request.body.uid == ""){
    returnErr.status = 2;
    returnErr.message = "Cannot update profile with empty fields";
    return response.status(500).json(returnErr)
  }


  //checking to see if username already exists
  con.query("SELECT uid from person WHERE username='"+personReturn.username+"'", function (err, result) {

    if(result.length == 0){

      //updating the person info there is no error
      con.query("UPDATE person SET username='"+personReturn.username+"',photo='"+request.body.photo+"' WHERE uid='"+request.body.uid+"'", function (err, result) {

        //checking if uid exists and profile was updated successfully
        if(result.affectedRows == 0 ){
          returnErr.status = 3;
          returnErr.message = "User ID doesnt exist";
          return response.status(500).json(returnErr)
        }

        //if successfull
        returnErr.status = 0;
        returnErr.message = "Profile updated successfully";
        response.status(200).json(returnErr)
        
      }) //end of update query

    }else{
      returnErr.status = 4;
      returnErr.message = "Username already taken";
      response.status(500).json(returnErr)
    }// end of result.length

  })//end of select query

};

const compareRoomIds = (roomIds_1,roomIds_2) =>{
  var flag = false

  if(roomIds_1 == [] || roomIds_2 == []) return flag

  //iterate roomIds of uid_1
  for(var i = 0 ; i < roomIds_1.length ; i++){
    //iterate roomIds of uid_2
    
    for(var j = 0 ; j < roomIds_2.length ; j++){
      //if there is an equal then flag = true

      if(roomIds_1[i].room_id == roomIds_2[j].room_id) flag=true
    }
  }

  return flag
}

const bondUsers =async (request,response) =>{

  //get variables
  const uid_1 = request.body.uid_1
  const uid_2 = request.body.uid_2
  const roomID = uuidv4();
  var roomIds_1 = [];
  var roomIds_2 = [];

  var returnErr = {
      status : 1,
      message: "Could not find user"
  }

  // check if uid_1 exists in database
  con.query("SELECT name,uid from person WHERE uid='"+uid_1+"' LIMIT 1", function (err, result_1) {
    
    // check if uid_1 does not exist then return err
    if(result_1.length == 0 || result_1 == undefined) return response.status(500).json(returnErr)

    // check if uid_2 exists in database
    con.query("SELECT name,uid from person WHERE uid='"+uid_2+"' LIMIT 1", function (err, result_2) {
      
      // check if uid_2 does not exist then return err
      if(result_2.length == 0 || result_1 == undefined) return response.status(500).json(returnErr)

        // get all room_id for uid_1
        con.query("SELECT room_id from bond WHERE person_uid='"+uid_1+"'", function (err, result_roomIds_1) {

          //if not empty then get results otherwise use default = []
          if(result_roomIds_1.length != 0 ) roomIds_1 = result_roomIds_1

          // get all room_id for uid_2
          con.query("SELECT room_id from bond WHERE person_uid='"+uid_2+"'", function (err, result_roomIds_2) {

          //if not empty then get results otherwise use default = []
          if(result_roomIds_2.length != 0 ) roomIds_2 = result_roomIds_2

          //compare to see if they have a similar room_id and return status 500 if true
          if(compareRoomIds(roomIds_1,roomIds_2)){
            returnErr.status = 3
            returnErr.message = "Bond is already created"
            response.status(500).json(returnErr)
            return
          }

          //set the returnErr to another error type
          returnErr.status = 2
          returnErr.message = "There was a problem executing the request"

          //start transaction
          con.beginTransaction((err) =>{

            // Failure transaction
            if(err){
              return con.rollback(() => {
                throw response.status(500).json(returnErr)
              })
            }
            
            //room name default format
            var room_name = result_1[0].name +" & "+ result_2[0].name 

            //insert to room_table before bond_table
            con.query("INSERT INTO room VALUES ('"+roomID+"','"+room_name+"')", function (err, result_room) {
              // Failure transaction
              if(err){
                return con.rollback(() => {
                  throw response.status(500).json(returnErr)
                })
              }
              
              //insert to bond with uid_1
              con.query("INSERT INTO bond VALUES ('"+roomID+"','"+result_1[0].uid+"')", function (err, result_bond_1) {
                // Failure transaction
                if(err){
                  return con.rollback(() => {
                    throw response.status(500).json(returnErr)
                  })
                }
                
                  //insert to bond with uid_2
                con.query("INSERT INTO bond VALUES ('"+roomID+"','"+result_2[0].uid+"')", function (err, result_bond_2) {
                  // Failure transaction
                  
                  if(err){
                    return con.rollback(() => {
                      throw response.status(500).json(returnErr)
                    })
                  }else{
                    con.commit((err)=>{
                      // Failure transaction
                      if(err){
                        return con.rollback(() => {
                          throw response.status(500).json(returnErr)
                        })
                      }

                      //if success
                      returnErr.status = 0
                      returnErr.message = "Bond Success!"
                      response.status(200).json(returnErr)
                    })
                  }
                })
              })
            })
          })
        })
      })
    })
  })
}

const getBondedUsers = async(request,response) =>{
  
  // initialize variables
  const targetUid = request.params.uid
  const roomIds = []
  const personIds = []
  const roomAndPerson =[]

  //initialize error return
  var returnErr = {
      status : 1,
      message : "No bonded users"
  }

  //get all room_ids of the target user
  con.query("SELECT room_id FROM bond WHERE person_uid ='"+targetUid+"'",(err , result_roomIds) =>{
    //if no bonded users
    if(result_roomIds.length == 0) return response.status(200).json(returnErr)

    //turn result to an array
    for(var i = 0 ; i < result_roomIds.length ; i++){
      roomIds.push("'"+result_roomIds[i].room_id+"'")
    }
    
    //get all person_uids of all room_ids
    con.query("SELECT person_uid,room.roomname,room.id FROM bond RIGHT JOIN room ON bond.room_id=room.id  WHERE room_id IN ("+roomIds+") AND person_uid != '"+targetUid+"' ",(err, result_personUids)=>{
      
      returnErr.status = 2
      returnErr.message = "There was a problem executing the request"

      //if something wrong with db
      if(err) return response.status(500).json(returnErr)

      //turn result to array
      for(i = 0 ; i < result_personUids.length ; i++){
        //push to string array
        personIds.push("'"+result_personUids[i].person_uid+"'")

        //push to entity relation
      }

      

      // get all bonded users
      con.query("SELECT * from person WHERE uid IN("+personIds+")",(err, result_people) => {
        //if something wrong with db
        if(err) return response.status(500).json(returnErr)

        //loop result_personUids
        for(i = 0 ; i < result_personUids.length ; i++){
          //loop result_people
          for(j = 0 ; j < result_people.length ; j++){
            //compare uids to return matched uids
            if(result_personUids[i].person_uid == result_people[j].uid){
              
              //create the object to return
              var returnObj ={
                'room_id'   : result_personUids[i].id,
                'roomname'  : result_personUids[i].roomname,
                'person'    : result_people[j]
              }
              //push to roomAndPerson array
              roomAndPerson.push(returnObj)
            }
          }
        }

        

        //in success
        response.status(200).json(roomAndPerson)
      })
    })
  })
}

//  exporting of all the modules
module.exports = {
    getAllusers,
    createUser,
    sendInvite,
    editUser,
    bondUsers,
    getBondedUsers
    
};
