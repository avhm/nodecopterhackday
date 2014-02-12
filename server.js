var EventEmitter = require('events').EventEmitter;
var game = new EventEmitter();
var input = require('./input');
var util = require('util');
var arDrone = require('ar-drone');
var client = arDrone.createClient();

var minDroneHeight = 0.2;

input.on('quit', quit);
input.on('enter', jump);

var gameState = 'OVER';

function gameover() {
  if(gameState !== 'STARTED') return;

  console.log('GAME OVER!!!');
  client.stop();
  client.land();
  gameState = 'OVER';
  game.emit('over');
}

function setup() {
  if(gameState !== 'OVER') return;
  console.log('SETTING UP!!!');
  console.log('BATTERY STATUS:', client.battery());
  client.disableEmergency()
  client.takeoff();

  gameState = 'SETTINGUP';
  game.emit('setting-up');
  setTimeout(function() {
    console.log('STARTED!!!');
    gameState = 'STARTED';
    game.emit('started');
  }, 5000);
}

function quit(){
  client.stop();
  client.land();
 console.log('Killing!')
 setTimeout(process.exit, 5000);
  // prevent being called again
 quit = function(){};
  
}

var currentJump;

function jump() {

  if(gameState === 'OVER') {
    setup();
  } else if(gameState === 'STARTED'){
    if(currentJump){
      clearTimeout(currentJump);
    }

    console.log('drone going up');
    client.up(1);

    currentJump = setTimeout(function(){
      client.down(1);
    }, 500);
  }
}


client.on('navdata', function(data){
  if(!data.demo) return;
  // If height below tolerance, end the game!
  if(data.demo.altitude < minDroneHeight && gameState === 'STARTED'){
    gameover();
  }
});


module.exports.jump = jump;
module.exports.clientEmitter = client;
module.exports.game = game;
