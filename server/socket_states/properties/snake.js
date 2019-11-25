const ArenaFile = require("./arena");

const {random, randomColor, decToHex} = require("./functions");

class Snake {
    constructor(x,y, id = null)
    {
      this.id = id;                           // socket id
      this.x = x; this.y = y;                 // initial position
      this.direction = {x:0, y:1};            // snake initially heading downwards
      this.skinIndex = random(1,2);           // index of skin image
      this.eatStack = 0;                      // counter for foods yet to be added to body
      this.isAlive = true;                    // snake is alive until they crash
      this.length = 3;                        // length of snake
      this.score = this.length;               // score of snake

      // create array of cell positions
      this.trail = [];
      for (let c = 0; c < this.length; c++) {
        this.trail.push([this.x, this.y-c]);
      }

      // number of frames snake entity exists on server after death until they completely despawn
      this.despawnCounter = 10;
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
          case("Food"):                         // food detected
            this.eatStack += cell.nutrition;    // record food to be eaten
            cell.respawn(arena);                // respawn food
            break;
        }

      }
      else if (cell === -2)                     // player hit edge of world
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
        this.score = this.length;
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

    isTheID(id) {
      return this.id == id;
    }

    isAlive() {
      return this.isAlive;
    }

    getDirectionNumber() {
      /* Returns direction index of direction that player is moving */
      if (this.direction.x == 0) {
        if (this.direction.y == -1) return 0; // player heading up
        else return 2;                        // player heading down
      }
      else {
        if (this.direction.x == -1) return 3; // player heading left
        else return 1;                        // player heading right
      }
    }

    getScore() {
      return this.score;
    }

  }

// exporting objects
module.exports = {
  Snake
}
