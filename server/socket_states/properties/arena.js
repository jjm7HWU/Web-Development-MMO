class Arena {

  constructor(width=10, height=10) {
    this.width = width;
    this.height = height;
    this.grid = [];
    // create grid of width x height
    for (let i = 0; i < this.width; i++) {
      let column = [];
      for (let j = 0; j < this.height; j++) {
        column.push(-1);
      }
      console.log(column);
      this.grid.push(column);
    }
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

  detectCollisions() {

    for (let snake of snakes) {

      // gets cell at new head position
      let cell = this.atTile(snake.x, snake.y);

      // collision detection
      if (typeof(cell) == "object") {

        switch (cell.getType()) {
          case("Food"):
            // food detected
            snake.eatStack += cell.nutrition;
            cell.respawn();
            break;
        }

      }

    }
  }

}

// exporting objects
module.exports = {
  Arena
}
