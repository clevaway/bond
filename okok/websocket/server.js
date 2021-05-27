const express = require('express');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const cors = require('cors');

app.use(cors());

io.on('connection', (client) => {
  console.log(`Connected => ${client.id}`);
  // client.on('event', data => { /* … */ });
  // When client disconnects
  client.on('disconnect', () => {
    console.log(`Disconnected => ${client.id}`);
  });
  //  create or join a room event from frontend
  client.on('createRoom', (room, userJoining) => {
    client.join(room);
    console.log(`${userJoining} joined room => ${room}`);
    io.to(room).emit('createRoomStatus', `Only users in Room => ${room} can see this message`);
  });

  // function to listen and emit vibration to devices
  client.on('vibrate', (room) => {
    console.log(`vibration all devices in room => ${room}`);
    io.to(room).emit('vibrateThisDevice', `Vibrating devices in Room => ${room}`);
  });

  //  to ping server from test
  // client.on('pingServer', (message) => {
  //   console.log(message);
  //   client.emit('message', `Message from backed, with client id => ${client.id}`);
  // });
  // sending data to client side
  // client.on('video', (videoLink) => {
  //   client.emit('video', videoLink);
  //   console.log(`sending to clients => ${videoLink}`);
  // });
});

server.listen(3000, () => {
  console.log('listening on port: 3000');
});
