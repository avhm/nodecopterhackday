var input = require('./input');
var util = require('util');
var arDrone = require('ar-drone');
var client = arDrone.createClient();

var minDroneHeight = .3;
var gameon = false;

input.on('quit', quit);

client.takeoff();

function quit(){
  client.stop();
  client.land();
  console.log('Killing!')
  setTimeout(process.exit, 200);
}

function start(){
  client.on('navdata', function(data){
    if(!data.demo) return;
    // If height below tolerance, end the game!
    if(data.demo.altitude < minDroneHeight){
      console.log('GAME OVER!!!');
      quit();
    }
  });
}

var currentJump;
input.on('enter', function() {

  if(!gameon){
    start();
    gameon = true;
  }

  if(currentJump){
    clearTimeout(currentJump);
  }
  
  client.up(1);

  currentJump = setTimeout(function(){
    client.down(.7);
  }, 400);

});
