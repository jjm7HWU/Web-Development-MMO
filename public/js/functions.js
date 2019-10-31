function getPlotX(x) {
  return CENTER_X + (x - player.x);
}

function getPlotY(y) {
  return CENTER_Y + (y - player.y);
}

function drawSquare(x, y, width, height, color=RED, thickness=0.02) {
  ctx.lineWidth = thickness * TILE_SIZE;
  ctx.strokeStyle = color;
  let X = x*TILE_SIZE;
  let Y = y*TILE_SIZE;
  ctx.beginPath();
  ctx.moveTo(X, Y)
  ctx.lineTo(X+TILE_SIZE, Y);
  ctx.lineTo(X+TILE_SIZE, Y+TILE_SIZE);
  ctx.lineTo(X, Y+TILE_SIZE);
  ctx.lineTo(X, Y);
  ctx.stroke();
}

function drawRect(x, y, width, height, color=BLACK) {
  ctx.fillStyle = color;
  ctx.fillRect(x*TILE_SIZE, y*TILE_SIZE, width*TILE_SIZE, height*TILE_SIZE);
}

function displayBackground() {
  drawRect(0, 0, X_VIEW, Y_VIEW, BACKGROUND_COLOR_1)
  for (let x = 0; x < X_VIEW; x++) {
    for (let y = 0; y < Y_VIEW; y++) {
      drawSquare(x, y, 1, 1, BACKGROUND_COLOR_2);
    }
  }
}

function random(min, max) {
  let range = max - min;
  return min + Math.floor(Math.random()*(range+1));
}

function decToHex(decimal) {
  let output = "";
  let p = 1, a;
  while (decimal > 0) {
    a = decimal % 16;
    output = "0123456789abcdef"[a] + output;
    decimal = Math.floor(decimal / 16);
  }
  return output;
}

function randomColor() {
  return "#"+decToHex(random(0,255))+decToHex(random(0,255))+decToHex(random(0,255));
}
