function getPlotX(x) {
  // get horizontal canvas position of x relative to player head's position
  return CENTER_X + (x - player.x);
  }

function getPlotY(y) {
  // get vertical canvas position of y relative to player head's position
  return CENTER_Y + (y - player.y);
}

function drawSquare(x, y, width, height, color=RED, thickness=0.02) {
  /* draw square at canvas position (x,y) without filling it */
  ctx.lineWidth = thickness * TILE_SIZE;
  ctx.strokeStyle = color;
  let X = Math.floor(x*TILE_SIZE);
  let Y = Math.floor(y*TILE_SIZE);
  ctx.beginPath();
  ctx.moveTo(X, Y);
  ctx.lineTo(X+TILE_SIZE, Y);
  ctx.lineTo(X+TILE_SIZE, Y+TILE_SIZE);
  ctx.lineTo(X, Y+TILE_SIZE);
  ctx.lineTo(X, Y);
  ctx.stroke();
}

function drawRect(x, y, width, height, color=BLACK) {
  /* Draw and fill square at canvas position (x,y) */
  ctx.fillStyle = color;
  ctx.fillRect(x*TILE_SIZE, y*TILE_SIZE, width*TILE_SIZE, height*TILE_SIZE);
}

function displayBackground(frameCounter) {
  /* Draw background grid */
  drawRect(0, 0, X_VIEW, Y_VIEW, BACKGROUND_COLOR_1) // fill/clear canvas

  /* get bounds for plotting grid - shows edge of world */
  let xBounds = {
    left: (player.x > X_PERIPHERAL) ? 0 : X_PERIPHERAL - player.x + 1,
    right: (player.x < arena.width - X_PERIPHERAL - 1) ? X_VIEW : CENTER_X + arena.width - player.x - 1
  };
  let yBounds = {
    top: (player.y > Y_PERIPHERAL) ? 0 : Y_PERIPHERAL - player.y + 1,
    bottom: (player.y < arena.height - Y_PERIPHERAL - 1) ? Y_VIEW : CENTER_Y + arena.height - player.y - 1
  };

  /* Display all grid boxes within these bounds */
  for (let x = xBounds.left; x < xBounds.right; x++) {
    for (let y = yBounds.top; y < yBounds.bottom; y++) {
      drawSquare(x+currentOffset.x, y+currentOffset.y, 1, 1, BACKGROUND_COLOR_2); // draw grid box
    }
  }
}

function getBodyCurve(prevPosition, currentPosition, nextPosition) {
  /* Get the correct curve for a part of a snake's body */

  // parse body cells to be connected by curve
  let prev = {x: prevPosition[0], y: prevPosition[1]};
  let curr = {x: currentPosition[0], y: currentPosition[1]};
  let next = {x: nextPosition[0], y: nextPosition[1]};

  if (prev.x == next.x) return {shape: 0, angle: 0};    // snake going straight up or down
  if (prev.y == next.y) return {shape: 0, angle: 90};   // snake going to the left or right

  // initialize output
  let curve = {shape: 1, angle: 0};

  // run through cases and get appropriate angle to be used when creating curve
  if (curr.y == prev.y && next.y > curr.y && curr.x > prev.x) curve.angle = 0;
  else if (curr.y == prev.y && next.y > curr.y && curr.x < prev.x) curve.angle = 270;
  else if (curr.y == prev.y && next.y < curr.y && curr.x > prev.x) curve.angle = 90;
  else if (curr.y == prev.y && next.y < curr.y && curr.x < prev.x) curve.angle = 180;
  else if (curr.x == prev.x && next.x > curr.x && curr.y > prev.y) curve.angle = 180;
  else if (curr.x == prev.x && next.x > curr.x && curr.y < prev.y) curve.angle = 270;
  else if (curr.x == prev.x && next.x < curr.x && curr.y > prev.y) curve.angle = 90;
  else if (curr.x == prev.x && next.x < curr.x && curr.y < prev.y) curve.angle = 0;

  return curve;
}

function fetchSkins() {
  /* Fetch the snake skins found in the imgs directory */
  let skins = [];

  for (let skinIndex = 1; skinIndex < 3; skinIndex++) {       // iterate through each skin index
    let skin1 = new Sprite("skin"+skinIndex+"_straight.png"); // load the straight body part
    let skin2 = new Sprite("skin"+skinIndex+"_corner.png");   // load the curved body part
    let skin3 = new Sprite("skin"+skinIndex+"_head.png");     // load the head
    let skin4 = new Sprite("skin"+skinIndex+"_tail.png");     // load the tail
    let skin5 = new Sprite("skin"+skinIndex+"_neck.png");     // load the neck
    skins.push(skin1, skin2, skin3, skin4, skin5);            // store images
  }

  return skins;
}

function getCurrentOffset(frameCounter) {
  /* Get current offset value for rendering each image equivalent to the mantissa of the player's head position */
  if (!player.isAlive) return {x: 0, y: 0}; // snake is dead so offset remains same

  let xOffset = (player.direction.x == 0) ? 0 : 0.5*player.direction.x - FRAME_OFFSET*frameCounter*player.direction.x; // horizontal offset
  let yOffset = (player.direction.y == 0) ? 0 : 0.5*player.direction.y - FRAME_OFFSET*frameCounter*player.direction.y; // vertical offset

  return {x: xOffset, y: yOffset};
}

function gameOverTransition() {
  // transparency of layer drawn on screen gets progressively decreases
  ctx.globalAlpha = 1/player.despawnCounter;

  // draw layer
  drawRect(0, 0, X_VIEW, Y_VIEW, BACKGROUND_COLOR_2);

  // remove transparency for drawing shapes
  ctx.globalAlpha = 1;
}
