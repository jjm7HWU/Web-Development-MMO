var TILE_SIZE; // height and width of each grid square

var X_VIEW; // horizontal render distance from snake head
var Y_VIEW; // vertical render distance from snake head

var CENTER_X; // center tile's x position for reference during plotting
var CENTER_Y; // center tile's y position

var CANVAS_WIDTH; // actual width of canvas in browser
var CANVAS_HEIGHT; // actual height of canvas in browser


function configureCanvasMeasurements(canvas_width, canvas_height) {
  CANVAS_WIDTH = canvas_width;
  CANVAS_HEIGHT = canvas_height;

  TILE_SIZE = 60;

  X_VIEW = 25;
  Y_VIEW = 15;

  CENTER_X = 12;
  CENTER_Y = 7;
}
