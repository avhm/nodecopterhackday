var express = require('express');
var app = express()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server),
  flappyDrone = require('./server'),
  client = flappyDrone.clientEmitter,
  droneStatus = null;

server.listen(8080);


app.use(express.static('public'));

io.sockets.on('connection', function (socket) {

  client.on('navdata', function(data){
    if(!data.demo) return;
    // If height below tolerance, end the game!
    socket.emit('drone-status', data.demo.altitude);
  });

  client.on('game-over', function(){
  	socket.emit('game-over', true);
  });
  
  socket.on('tap', function (data) {
    console.log('Tap detected');
    flappyDrone.jump();
  });

});
