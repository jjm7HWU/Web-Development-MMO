class Arena {

  constructor(width=10, height=10) {
    this.width = width;
    this.height = height;
    this.grid = this.createArena(this.width, this.height);
  }

  display() {
    console.log(this.grid);
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
    this.grid[x][y] = value;
  }

  atTile(x, y) {
    // return value at tile (x,y)
    return this.grid[x][y];
  }

  placeSnake(id, trail) {
    for (let cell of trail) {
      this.grid[cell[0]][cell[1]] = id;
    }
  }

  removeSnake(id, trail) {
    for (let cell of trail) {
      if (this.grid[cell[0]][cell[1]] === id) {
        this.grid[cell[0]][cell[1]] = -1;
      }
    }
  }

}

// exporting objects
module.exports = {
  Arena
}
