var socket = io.connect(window.location.href);
var birdEl = document.querySelector('.bird');
var gameOverEl = document.querySelector('.gameOver');
var getReadyEl = document.querySelector('.getReady');
var gameOverFlag = true;

var maxHeight = 2;

var dims = {
	height: window.innerHeight,
	width: window.innerWidth
}

TweenLite.set(birdEl, {
	x: dims.width/2,
	y: dims.height/2
});

$(window).on('resize', function(){
	dims.height = window.innerHeight;
	dims.width = window.innerWidth;
})

var lastPos = 0;

socket.on('drone-status', function (alt) {
	if(!alt) return;

	var heightInM = alt;
	var newHeight = (((heightInM / maxHeight) * dims.height) * -1) + dims.height + (dims.height/10);
	var heightDiff = lastPos - newHeight;

	console.log(heightDiff);

	lastPos = newHeight;

	TweenLite.to(birdEl, .1, {
		y: newHeight,
		rotation: heightDiff
	})
});

socket.on('game-over', gameOver)
socket.on('get-ready', getReady);
socket.on('game-started', gameStarted);

function gameOver(){
	TweenLite.to(gameOverEl, .2, {
		opacity: 1
	})

	TweenLite.to(getReadyEl, .2, {
		opacity: 0
	})	
}

function getReady(){
	TweenLite.to(getReadyEl, .2, {
		opacity: 1
	})

	TweenLite.to(gameOverEl, .2, {
		opacity:0
	})
}

function gameStarted(){
	TweenLite.to([getReadyEl, gameOverEl], .2, {
		opacity: 0
	})	
}

function tap() {
  console.log('tap');
  socket.emit('tap');
  if(gameOverFlag){
  	console.log('starting game!');
  	gameStart();
  }
}

TweenLite.set(gameOverEl, {
	opacity:0
})

$('body').on('click', tap).on('tap', tap);