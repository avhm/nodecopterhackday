var input = require('./input');
var util = require('util');
var arDrone = require('ar-drone');
var client = arDrone.createClient();

input.on('quit', function() {
  client.stop();
  client.land();
  process.exit();
});

client.takeoff();

var step;

input.on('enter', function() {

  if(step){
    clearTimeout(step);
  }
  
  client.up(1);

  step = setTimeout(function(){
    client.down(.7);
  }, 400);

});
