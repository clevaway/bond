const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const cors = require('cors');
app.use(cors());

io.on('connection', function (client) {
        console.log('a user connected => '+client.id);
        // client.on('event', data => { /* … */ });
        // When client disconnects
        client.on('disconnect', () => { 
            console.log("Client => "+client.id+" disconnected")
         });
        //  creating a room event from frontend
        client.on('createRoom', function(room) {
          client.join(room);
          console.log(`socket ${client.id} created room ${room}`)
          io.to(room).emit('createRoomStatus', "Only users in Room => "+room+" can see this message")

        });
          //  Joining a room
          client.on('joinRoom', function(room) {
            client.join(room);
            console.log(`socket ${client.id} has joined room ${room}`)
            // broadcasting to users in a room
            io.to(room).emit('someoneJoined', "Someone joined!")
  
          });


         
        //  to ping server from test
         client.on('pingServer', (message) =>{
             console.log(message);
             client.emit("message",'Message from backed, with client id => '+client.id)
         })
          // sending data to client side
          client.on('video', (videoLink) => {
            client.emit('video', videoLink);
              console.log("sending to clients =>"+videoLink)
          });

 
})

server.listen(3000, function(){
    console.log('listening on port: 3000');
});