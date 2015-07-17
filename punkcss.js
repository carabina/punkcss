// Call this JS from browser:
// javascript:(function(a){a.head.innerHTML ='';a.body.innerHTML ='';var b=a.createElement('script');b.src='//punkcss.com/punkcss.js';a.getElementsByTagName('head')[0].appendChild(b)})(document);

"use strict";

var link = document.createElement('link');
link.rel  = 'stylesheet';
// link.href = '//punkcss.com/punkcss.css';
link.href = '//localhost:8000/punkcss.css';
document.head.appendChild(link);

var windowWidth = window.innerWidth;

var canvas = document.createElement('iframe');
canvas.src = window.location;
canvas.width = windowWidth;
canvas.height = window.innerHeight;
canvas.style.transformOrigin = "0 0";
document.body.appendChild(canvas);

var scale;
window.onresize = function(){
	windowWidth = window.innerWidth;
	scale = windowWidth/canvas.width;
	canvas.style.transform = ('scale('+scale+')');
};

var controls = document.createElement('div');
controls.id = 'controls';
document.body.appendChild(controls);

var scaleControl = document.createElement('input');
scaleControl.type = 'range';
scaleControl.min = 0.10;
scaleControl.max = 2.00;
scaleControl.value = scale;
scaleControl.step = 0.01;
controls.appendChild(scaleControl)

scaleControl.oninput = function() {
	scale = this.value;
	canvas.style.transform = ('scale('+scale+')');
};

var handControl = document.createElement('button');
var handControlActive = false;
handControl.innerHTML = 'Hand tool';
controls.appendChild(handControl);

handControl.onclick = function(){
	if (handControlActive) {
		handControl.innerHTML = 'Hand tool';
		document.body.dataset.mode = '';
	} else {
		handControl.innerHTML = 'Hand tool [active]';
		document.body.dataset.mode = 'hand';
		document.addEventListener('mousedown', function(e){
			var origin = {
				x: e.clientX,
				y: e.clientY,
			};
			document.addEventListener('mousemove', function(e){
				var move = {
					x: e.clientX,
					y: e.clientY,
				};
				if (handControlActive){
					canvas.style.top = canvas.style.top+move.y-origin.y+'px';
					canvas.style.left = canvas.style.left+move.x-origin.x+'px';
				}
			});
			document.addEventListener('mouseup', function(e){
				handControlActive = !handControlActive;
			});
		});
	};
	handControlActive = !handControlActive;
};

// Reloading using "R" key
window.addEventListener('keydown', function(k){
	switch(k.keyCode){
		case 82:
			canvas.contentWindow.location.reload(true);
			break;
		default: 
			break;
	};
});