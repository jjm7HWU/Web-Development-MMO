class Arena {

  constructor() {
    this.width = 100;
    this.height = 100;
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

}
