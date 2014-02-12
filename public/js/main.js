var socket = io.connect(window.location.href);
var birdEl = document.querySelector('.bird');

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

	TweenLite.set(birdEl, {
		x: dims.width/2,
		y: dims.height/2
	});
})

socket.on('news', function (data) {
  console.log(data);
});

function tap() {
  console.log('tap');
  socket.emit('tap');
}

$('body').on('click', tap).on('tap', tap);