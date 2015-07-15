// Call this JS from browser:
// javascript:(function(a){a.head.innerHTML ='';a.body.innerHTML ='';var b=a.createElement('script');b.src='//punkcss.com/punkcss.js';a.getElementsByTagName('head')[0].appendChild(b)})(document);

var link = document.createElement('link');
link.rel  = 'stylesheet';
link.href = '//punkcss.com/punkcss.css';
document.head.appendChild(link);

var windowWidth = window.innerWidth;

var canvas = document.createElement('iframe');
canvas.src = window.location;
canvas.width = windowWidth;
canvas.height = window.innerHeight;
canvas.style.transformOrigin = "0 0";
document.body.appendChild(canvas);

window.onresize = function(){
	windowWidth = window.innerWidth;
	var scale = windowWidth/canvas.width;
	canvas.style.transform = ("scale("+scale+")");
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