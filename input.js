var EventEmitter = require('events').EventEmitter;
var util = require('util');
var arDrone = require('ar-drone');
var client = arDrone.createClient();

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
  this.stop();
  this.land();
  process.exit();
}

client.takeoff();

var step;

emitter.on('enter', function() {

  if(step){
    clearTimeout(step);
  }
  
  client.up(1);

  step = setTimeout(function(){
    client.down(.7);
  }, 400);

});

emitter.on('enter', function() {

});

module.exports = emitter;
