var socket = io.connect(window.location.href);
var birdEl = document.querySelector('.bird');
var gameOverEl = document.querySelector('.gameOver');
var getReadyEl = document.querySelector('.getReady');

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

socket.on('drone-status', function (alt) {
	console.log(alt);
	if(!alt) return;

	var heightInM = alt;

	var newHeight = (((heightInM / maxHeight) * dims.height) * -1) + dims.height + (dims.height/10);

	console.log(alt, newHeight);

	TweenLite.to(birdEl, .3, {
		y: newHeight
	})
});

socket.on('game-over', function(data){
	gameOver();
})

function gameOver(){
	TweenLite.to(gameOverEl, .2, {
		opacity: 1
	})

	TweenLite.to(getReadyEl, .2, {
		opacity: 0
	})	
}

function gameStart(){
	TweenLite.to(getReadyEl, .2, {
		opacity: 1
	})

	setTimeout(function(){
		TweenLite.to(getReadyEl, .2, {
			opacity: 0
		})		
	}, 500)
}

function tap() {
  console.log('tap');
  socket.emit('tap');
}

$('body').on('click', tap).on('tap', tap);