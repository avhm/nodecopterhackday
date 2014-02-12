var EventEmitter = require('events').EventEmitter;
var util = require('util');

var emitter = new EventEmitter();

process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', function (text) {
  emitter.emit('enter');
  if (text === 'quit\n') {
    done();
  }
});

function done() {
  console.log('Now that process.stdin is paused, there is nothing more to do.');
  process.exit();
}

emitter.on('enter', function() {
  console.log('up!');
});

module.exports = emitter;
