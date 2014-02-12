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