var socket = io.connect(window.location.href);
var birdEl = document.querySelector('.bird');

var maxHeight = 3;

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

	// TweenLite.set(birdEl, {
	// 	x: dims.width/2,
	// 	y: dims.height/2
	// });
})

socket.on('drone-status', function (data) {
	if(!data.demo) return;

	var heightInM = data.demo.altitude;

	var newHeight = (dims.height - (maxHeight - heightInM));

	TweenLite.to(birdEl, .2, {
		y: newHeight
	})
});

function tap() {
  console.log('tap');
  socket.emit('tap');
}

$('body').on('click', tap).on('tap', tap);