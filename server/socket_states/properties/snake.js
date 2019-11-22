const ArenaFile = require("./arena");

const {random, randomColor, decToHex} = require("./functions");

class Snake {
    constructor(x,y, id = null)
    {
      this.id = id;
      this.x = x; this.y = y;
      this.direction = {x:0, y:1}; // snake initially heading downwards
      this.colors = [randomColor(), randomColor()];
      this.skinIndex = random(1,2);
      this.eatStack = 0;
      this.length = 5;
      this.trail = []
      for (let c = 0; c < this.length; c++) {
        this.trail.push([this.x, this.y-c]);
      }
      this.isAlive = true;
    }

    /* Changes snake position according to current directions */
    update(arena) {
      this.x += this.direction.x;
      this.y += this.direction.y;

      // gets cell at new head position
      let cell = arena.atTile(this.x, this.y);

      // check for collisions at new head position
      this.checkForCollisions(arena, cell);

      // if no collision detected then update snake's trail
      if (this.isAlive) arena = this.moveSnakeBody(arena);

      return arena;
    }

    /* Check for any collisions at head of snake */
    checkForCollisions(arena, cell) {
      if (typeof(cell) == "object")
      {
        switch (cell.getType()) {
          case("Food"):
            // food detected
            this.eatStack += cell.nutrition;
            cell.respawn(arena);
            break;
        }

      }
      else if (cell === -2) // player hit edge of world
      {
        this.isAlive = false;
      }
      else if (cell !== -1 && cell !== this.id) // player hit other snake
      {
        this.isAlive = false;
      }
    }

    /* Move snake's body forward */
    moveSnakeBody(arena) {
      // removes end of tail
      if (this.eatStack == 0) {
        let tail = this.trail.pop();
        arena.setTile(tail[0], tail[1], -1);
      }
      else { // unless snake is eating
        this.eatStack--;
        this.length++;
      }

      // adds new head position to body
      this.trail.unshift([this.x, this.y]);
      arena.setTile(this.x, this.y, this.id);

      return arena;
    }

    turn(n) {
      /* Changes snake direction to corresponding number */
      if ((this.getDirectionNumber() + 2) % 4 == n) return;
      switch (n)
      {
        // do nothing
        case (-1) : break;
        case (0) : this.direction.x = 0; this.direction.y = -1; break;    // turn UP
        case (1) : this.direction.x = 1; this.direction.y = 0; break;     // turn RIGHT
        case (2) : this.direction.x = 0; this.direction.y = 1; break;     // turn DOWN
        case (3) : this.direction.x = -1; this.direction.y = 0; break;    // turn LEFT
      }
    }

    isTheID(id)
    {
        return this.id == id;
    }

    isAlive() {
      return this.isAlive;
    }

    getDirectionNumber() {
      if (this.direction.x == 0) {
        if (this.direction.y == -1) return 0;
        else return 2;
      }
      else {
        if (this.direction.x == 1) return 1;
        else return 3;
      }
    }

  }

// exporting objects
module.exports = {
  Snake
}
