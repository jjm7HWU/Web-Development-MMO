class Arena {

  constructor(width=10, height=10) {
    this.width = width;
    this.height = height;
    this.grid = this.createArena(this.width, this.height);
  }

  createArena(width, height) {
    // create grid of width x height
    let grid = [];
    for (let i = 0; i < width; i++) {
      let column = [];
      for (let j = 0; j < height; j++) {
        column.push(-1);
      }
      grid.push(column);
    }

    // place walls
    for (let i = 0; i < width; i++) {
      grid[i][0] = -2;
      grid[i][height-1] = -2;
    }
    for (let j = 0; j < height; j++) {
      grid[0][j] = -2;
      grid[width-1][j] = -2;
    }

    return grid;
  }

  setTile(x, y, value) {
    // set tile (x,y) to value
    if (0 <= x < this.width && 0 <= y < this.height) {
      this.grid[x][y] = value;
    }
  }

  atTile(x, y) {
    // return value at tile (x,y)
    if (0 <= x < this.width && 0 <= y < this.height) {
      return this.grid[x][y];
    }
    else {
      return -2;
    }
  }

  placeSnake(snake) {
    let id = snake.id;
    let trail = snake.trail;
    // place the snake on the grid
    for (let cell of trail) {
      this.setTile(cell[0], cell[1], id);
    }
  }

  removeSnake(snake) {
    let id = snake.id;
    let trail = snake.trail;
    // remove the snake from the grid
    for (let cell of trail) {
      if (this.atTile(cell[0], cell[1]) == id) {
        this.setTile(cell[0], cell[1], -1);
      }
    }
    if (this.atTile(snake.x, snake.y) == id) {
      this.setTile(snake.x, snake.y, -1);
    }
  }

}

// exporting objects
module.exports = {
  Arena
}
