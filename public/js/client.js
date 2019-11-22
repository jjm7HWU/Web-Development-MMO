/* Event listener for handling key presses */
document.addEventListener("keydown", event => {
  event.preventDefault();     // prevents scrolling and tab selection
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

// create canvas and get context
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

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
