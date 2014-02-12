var express = require('express');
var app = express()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server),
  flappyDrone = require('./server'),
  client = flappyDrone.clientEmitter,
  droneStatus = null;

server.listen(8080);

client.on('navdata', function(data){
    if(!data.demo) return;
    // If height below tolerance, end the game!
    droneStatus = data;
  });

app.use(express.static('public'));

io.sockets.on('connection', function (socket) {

  socket.emit('drone-status', droneStatus);

  socket.on('tap', function (data) {
    console.log('Tap detected');
    flappyDrone.jump();
  });

});
