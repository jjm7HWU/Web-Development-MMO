// create canvas and get context
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

var intialTouchX = null;
var initialTouchY = null;

document.addEventListener("touchstart", event => {
  var touchPos = event.touches[0];
  initialTouchX = touchPos.clientX;
  initialTouchY = touchPos.clientY;
}, false);

document.addEventListener("touchend", event => {
  initialTouchX = null;
  initialTouchY = null;
}, false);

document.addEventListener("touchmove", event => {
  if (initialTouchX == null | initialTouchY == null) return;

  var touchPos = event.touches[0];

  var xNow = touchPos.clientX;
  var yNow = touchPos.clientY;

  var xChange = xNow - initialTouchX;
  var yChange = yNow - initialTouchY;

  var moveDirection;
  var n = -1;
  if (Math.abs(xChange) > Math.abs(yChange)) {
    if (getSine(xChange) == -1) {
      n = 3;
    }
    else {
      n = 1;
    }
  }
  else {
    if (getSine(yChange) == -1) {
      n = 0;
    }
    else {
      n = 2;
    }
  }

  if (n != -1) socket.emit("update dir", n);

}, false);

/* Event listener for handling key presses */
document.addEventListener("keydown", event => {
  var n;
  switch (event.keyCode) {
    case (87) : n = 0; break; // W KEY to go up
    case (68) : n = 1; break; // D KEY to go right
    case (83) : n = 2; break; // S KEY to go down
    case (65) : n = 3; break; // A KEY to go left
    case (38) : n = 0; break; // UP ARROW KEY to go up
    case (39) : n = 1; break; // RIGHT ARROW KEY to go right
    case (40) : n = 2; break; // DOWN ARROW KEY to go down
    case (37) : n = 3; break; // LEFT ARROW KEY to go left
    default : n = -1; break;
  }
  if (n != -1) socket.emit("update dir", n);
});

function resizeCanvas(){
  var width= window.innerWidth;
  var height= window.innerHeight;
  canvas.innerHeight = height;
  canvas.innerWidth = width;
}

resizeCanvas();

ctx.imageSmoothingEnabled = false;

// configure initial measurements
configureCanvasMeasurements(canvas.width);

var skins = fetchSkins();
var foodAnimation = new SpriteAnimation("food", 6);
var currentOffset;
