var EventEmitter = require('events').EventEmitter;
var util = require('util');

var emitter = new EventEmitter();

process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', function (text) {
  if (text === 'quit\n') {
    emitter.emit('quit');
  } else {
    emitter.emit('enter');
  }
});

module.exports = emitter;
