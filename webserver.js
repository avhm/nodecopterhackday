var express = require('express');
var app = express()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server);

server.listen(8080);

app.use(express.static('public'));

io.sockets.on('connection', function (socket) {

  socket.emit('drone-status', { hello: 'world' });

  socket.on('tap', function (data) {
    console.log('Tap detected');
  });

});
