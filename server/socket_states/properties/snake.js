function random(min, max) {
  /* Return random integer n in range min <= n <= max */
  let range = max - min;
  return min + Math.floor(Math.random()*(range+1));
}


class Snake {
    constructor(x,y, id = null) 
    {
      this.id = id;
      this.x = x; 
      this.y = y;
      this.direction = {x:0, y:1}; // snake initially heading downwards
      // create snake body of random length
      this.trail = [(this.x, this.y)];
      // turn_countdown decreases by one each frame and when zero is reached the snake turns
      // in a random direction and countdown_timer is reset
    }
  
    /* Changes snake position according to current directions */
    update(turn = -1) {

      // checks if a direction was changed
      if(turn != -1)
      {
        this.turn(turn)
      }

      // updates snake's position
      this.x += this.direction.x;
      this.y += this.direction.y;
  
      // removes end of tail and adds new head position to body
      this.trail.pop();
      this.trail.unshift([this.x, this.y]);
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
  
  }

// exporting objects
module.exports = {
  Snake
}