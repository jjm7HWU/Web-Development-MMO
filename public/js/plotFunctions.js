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

    /* get bounds for plotting grid - shows edge of world */
    let xBounds = {
      left: (player.x > X_PERIPHERAL) ? 0 : X_PERIPHERAL - player.x + 1,
      right: (player.x < arena.width - X_PERIPHERAL - 1) ? X_VIEW : CENTER_X + arena.width - player.x - 1
    };

    let yBounds = {
      top: (player.y > Y_PERIPHERAL) ? 0 : Y_PERIPHERAL - player.y + 1,
      bottom: (player.y < arena.height - Y_PERIPHERAL - 1) ? Y_VIEW : CENTER_Y + arena.height - player.y - 1
    };

    for (let x = xBounds.left; x < xBounds.right; x++) {
      for (let y = yBounds.top; y < yBounds.bottom; y++) {
        drawSquare(x, y, 1, 1, BACKGROUND_COLOR_2); // draw grid box
      }
    }
    ctx.stroke();
  }
