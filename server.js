var input = require('./input');
var util = require('util');
var arDrone = require('ar-drone');
var client = arDrone.createClient();

var minDroneHeight = .2;
var gameon = false;

input.on('quit', quit);
input.on('enter', jump);

function gameover(){
  gameon = false;
  client.stop();
  client.land();
  client.emit('game-over');
}

function quit(){
  gameover();  
 console.log('Killing!')
 setTimeout(process.exit, 1000);
  // prevent being called again
 quit = function(){};
  
}

function start(){
  client.takeoff();
  client.on('navdata', function(data){
    if(!data.demo) return;
    // If height below tolerance, end the game!
    if(data.demo.altitude < minDroneHeight){
      console.log('GAME OVER!!!');
      gameover();
    }
  });
}

var currentJump;

function jump(){

  if(!gameon){
    start();
    // client.front(.1);
    console.log('BATTERY STATUS:', client.battery());
    gameon = true;
  }

  if(currentJump){
    clearTimeout(currentJump);
  }
  
  console.log('drone going up');
  client.up(1);

  currentJump = setTimeout(function(){
    client.down(1);
  }, 500);

}


module.exports.jump = jump;
module.exports.clientEmitter = client;
