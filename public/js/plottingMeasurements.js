var TILE_SIZE; // height and width of each grid square

var X_VIEW; // horizontal render distance from snake head
var Y_VIEW; // vertical render distance from snake head

var CENTER_X; // center tile's x position for reference during plotting
var CENTER_Y; // center tile's y position

var CANVAS_WIDTH; // actual width of canvas in browser
var CANVAS_HEIGHT; // actual height of canvas in browser

var X_PERIPHERAL; // distance from snake head to left/right edges of screen
var Y_PERIPHERAL; // distance from snake head to top/right edges of screen


function configureCanvasMeasurements(canvas_width, canvas_height) {
  CANVAS_WIDTH = canvas_width;
  CANVAS_HEIGHT = canvas_height;

  TILE_SIZE = 60;

  X_VIEW = 25;
  Y_VIEW = 15;

  X_PERIPHERAL = Math.floor((X_VIEW-1)/2);
  Y_PERIPHERAL = Math.floor((Y_VIEW-1)/2);

  CENTER_X = 12;
  CENTER_Y = 7;
}
