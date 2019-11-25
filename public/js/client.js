// create canvas and get context
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

var intialTouch = {x: null, y: null};

/* Event listener for detecting finger press on touch screen */
document.addEventListener("touchstart", event => {
  initialTouch = getTouchPosition(event);
}, false);

/* Event listener for finger moving on touch screen */
document.addEventListener("touchmove", event => {
  // if screen no longer being touched then leave block
  if (initialTouch.x == null || initialTouch.y == null) return;

  // get current position of finger
  var positionNow = getTouchPosition(event);

  // determine which direction the player must move
  var n = getTurnDirectionTouch(initialTouch, positionNow);

  // attempt to turn player
  if (n != -1) socket.emit("update dir", n);

}, false);

/* Event listener for detecting finger leaving touch screen */
document.addEventListener("touchend", event => {
  // screen is not being touched - no finger positions
  initialTouch = {x: null, y:null};
}, false);

/* Event listener for handling key presses */
document.addEventListener("keydown", event => {
  var n;
  switch (event.keyCode) {
    case (87) : n = 0; break; // W KEY to go up
    case (68) : n = 1; break; // D KEY to go right
    case (83) : n = 2; break; // S KEY to go down
    case (65) : n = 3; break; // A KEY to go left
    case (38) : event.preventDefault(); n = 0; break; // UP ARROW KEY to go up
    case (39) : event.preventDefault(); n = 1; break; // RIGHT ARROW KEY to go right
    case (40) : event.preventDefault(); n = 2; break; // DOWN ARROW KEY to go down
    case (37) : event.preventDefault(); n = 3; break; // LEFT ARROW KEY to go left
    default : n = -1; break;
  }
  // attempt to turn player
  if (n != -1) socket.emit("update dir", n);
});

function resizeCanvas(){
  var width= window.innerWidth;     // get full width of screen
  var height= window.innerHeight;   // get full height of screen
  canvas.innerWidth = width;        // set width of canvas to full width of screen
  canvas.innerHeight = height;      // set height of canvas to full height of screen
}

resizeCanvas();

// configure initial measurements
configureCanvasMeasurements(canvas.width);

var skins = fetchSkins();
var foodAnimation = new SpriteAnimation("food", 6);
var currentOffset;
