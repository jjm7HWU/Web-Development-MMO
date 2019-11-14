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
     // TODO: Integrate PixiJS. This implementation is temporary.
    ctx.lineWidth = thickness * TILE_SIZE;
    ctx.strokeStyle = color;
    let X = x*TILE_SIZE;
    let Y = y*TILE_SIZE;
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

  function displayBackground() {
    /* Draw background grid */
    drawRect(0, 0, X_VIEW, Y_VIEW, BACKGROUND_COLOR_1) // fill/clear canvas

    /* get grid bounds for plotting */
    let xBounds = {
      left: (player.x - X_PERIPHERAL <= 0) ? player.x - X_PERIPHERAL : 0
    }

    for (let x = 0; x < X_VIEW; x++) {
      for (let y = 0; y < Y_VIEW; y++) {
        drawSquare(x, y, 1, 1, BACKGROUND_COLOR_2); // draw grid box
      }
    }
    ctx.stroke();
  }
