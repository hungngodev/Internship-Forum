var images = document.querySelectorAll('img');
new simpleParallax(images, {
	delay: .9,
	transition: 'cubic-bezier(0,0,0,1)',
	scale: 1.6,
});

