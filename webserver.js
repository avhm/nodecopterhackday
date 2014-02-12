var express = require('express');
var app = express()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server),
  flappyDrone = require('./server'),
  game = flappyDrone.game,
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

  game.on('over', function() {
    socket.emit('game-over');
  });
  game.on('setting-up', function() {
    socket.emit('get-ready');
  });
  game.on('started', function() {
    socket.emit('game-started');
  });
  
  socket.on('tap', function (data) {
    console.log('Tap detected');
    flappyDrone.jump();
  });

});
