const ArenaFile = require("./arena");

const {random, randomColor, decToHex} = require("./functions");

class Snake {
    constructor(x,y, id = null)
    {
      this.id = id;
      this.x = x; this.y = y;
      this.direction = {x:0, y:1}; // snake initially heading downwards
      this.colors = ["#ff0022", "#ffee11"];
      this.eatStack = 0;
      this.length = 1;
      this.trail = []
      for (let c = 0; c < this.length; c++) {
        this.trail.push([this.x, this.y+c]);
      }
      this.isAlive = true;
    }

    /* Changes snake position according to current directions */
    update(arena) {
      this.x += this.direction.x;
      this.y += this.direction.y;

      // gets cell at new head position
      let cell = arena.atTile(this.x, this.y);

      // collision detection
      if (typeof(cell) == "object") {

        switch (cell.getType()) {
          case("Food"):
            // food detected
            this.eatStack += cell.nutrition;
            cell.respawn(arena);
            break;
        }

      }
      else if (cell === -2) {
        this.isAlive = false;
        console.log("Ya brick")
      }


      if (this.isAlive) {

        // removes end of tail
        if (this.eatStack == 0) {
          let tail = this.trail.pop();
          arena.setTile(tail[0], tail[1], -1);
        }
        else { // unless snake is eating
          this.eatStack--;
        }

        // adds new head position to body
        this.trail.unshift([this.x, this.y]);
        arena.setTile(this.x, this.y, 0);
      }

      // removes end of tail and adds new head position to body
      this.trail.pop();
      this.trail.unshift([this.x, this.y]);

      return arena;
    }

    turn(n) {
      /* Changes snake direction to corresponding number */
      // TODO: send to server message that you are going in direction n
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

  }

// exporting objects
module.exports = {
  Snake
}
