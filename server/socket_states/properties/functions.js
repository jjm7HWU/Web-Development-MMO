module.exports = {


  getPlotX(x) {
    // get horizontal canvas position of x relative to player head's position
    return CENTER_X + (x - player.x);
  },

  getPlotY(y) {
     // get vertical canvas position of y relative to player head's position
    return CENTER_Y + (y - player.y);
  },

  drawSquare(x, y, width, height, color=RED, thickness=0.02) {
     /* draw square at canvas position (x,y) without filling it */
     // TODO: Integrate PixiJS. This implementation is temporary.
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
  },

  drawRect(x, y, width, height, color=BLACK) {
    /* Draw and fill square at canvas position (x,y) */
    ctx.fillStyle = color;
    ctx.fillRect(x*TILE_SIZE, y*TILE_SIZE, width*TILE_SIZE, height*TILE_SIZE);
  },

  displayBackground() {
    /* Draw background grid */
    drawRect(0, 0, X_VIEW, Y_VIEW, BACKGROUND_COLOR_1) // fill/clear canvas
    for (let x = 0; x < X_VIEW; x++) {
      for (let y = 0; y < Y_VIEW; y++) {
        drawSquare(x, y, 1, 1, BACKGROUND_COLOR_2); // draw grid box
      }
    }
    ctx.stroke();
  },

  random(min, max) {
    /* Return random integer n in range min <= n <= max */
    let range = max - min;
    return min + Math.floor(Math.random()*(range+1));
  },

  decToHex(decimal) {
    /* Convert decimal int to hexadecimal string */
    let output = "";
    let p = 1, a;
    while (decimal > 0) {
      a = decimal % 16;
      output = "0123456789abcdef"[a] + output;
      decimal = Math.floor(decimal / 16);
    }
    return output;
  },

  createEntities() {
    let snakes = [];

    // Add 100 random food
    let foods = [];
    for (let c = 0; c < 100; c++) {
      foods.push(new Food());
    }

    return {snakes, foods};
  }
}
