function display(frameCounter, foods, player, snakes, arena) {

  currentOffset = getCurrentOffset(frameCounter);

  // Display canvas
  displayBackground(frameCounter);

  // cast player
  _player = new Snake(player);

  if (_player.despawnCounter > 0) {

    /* cast and display all food items in area surrounding player*/
    for (let gridX = player.x-X_PERIPHERAL-1; gridX < player.x+X_PERIPHERAL+2; gridX++) {
      for (let gridY = player.y-Y_PERIPHERAL-1; gridY < player.y+Y_PERIPHERAL+2; gridY++) {

        let cell = _arena.atTile(gridX, gridY); // get cell

        if (cell != null) {
          if (typeOfCell(cell) == "Food") {       // cell is food
            _cell = new Food(cell);               // cast to food object
            _cell.display(frameCounter);          // display food object
          }
          else if (cell == -2) {
            drawRect(getPlotX(gridX)+currentOffset.x, getPlotY(gridY)+currentOffset.y, 1, 1, LIGHT_GRAY); // draw grid box
          }
        }
      }
    }

    /* display player and all other snakes */
    _player.display();
    for (const snake of snakes) {
      _snake = new Snake(snake);
      _snake.display();
    }

    // display transition on screen if player is despawning
    if (!_player.isAlive) gameOverTransition();
  }

  // update interface
  document.getElementById("score-out").innerHTML = player.length;
}



// initialise websocket
var socket = io();

socket.nickname = window.location.search;

// elements variables
var form = document.getElementById("messages-form")
var input = document.getElementById("message-input");
var messages = document.getElementById("messages")


// form submit event handler
form.addEventListener("submit",function (e)
{
    // prevents page reloading
    e.preventDefault();

    // adding input value
    var val = input.value;

    // resetting the input value
    input.value = "";

    // emit socket event
    socket.emit("chat message", val)
})

// append list html element to unordered list
var appendLi = function (message)
{
    // creates a new list html element
    var li = document.createElement("li");

    // creates a new text html element
    var textNode = document.createTextNode(message);

    // appends new text to list
    li.appendChild(textNode);

    // appends list to ul html element
    messages.appendChild(li);
}

// websocket event handler
socket.on("chat message", function(msg)
{
    // appends text to ul html element
    appendLi(msg);

    console.log("Server message: " + msg);
})

var foods;
var snakes;
var player;
var arena;
var _arena;

// on game state
socket.on("game state", function(gameState)
{
  // retrieve entities from game state
  foods = gameState.foodItems;
  snakes = gameState.snakes;
  arena = gameState.arena;
  _arena = new Arena(arena);

  // identify player if found, otherwise do not change player value
  player = snakes.find(function(snake){
    return snake.id == socket.id;
  }) || player;

  if (player.despawnCounter == 0) { // player must now despawn
    redirectPlayer();               // redirect to homepage
    return;                         // leave block
  }

  /* local loop for showing animated frames between server game loop */

  // time loop was last called (zero to call immediately)
  let lastTime = 0;
  // current animation frame
  let frameCounter = 0;

  const callback = (millis) => {
    if (millis-lastTime > 30) {                             // every 33ms
      display(frameCounter, foods, player, snakes, arena);  // display entities
      frameCounter++;                                       // count animation frame
      lastTime = millis;                                    // record time at end of this loop
    }
    if (frameCounter < 6) {                                 // if not yet last frame
      window.requestAnimationFrame(callback);               // call next animation frame
    }
  };

  // call initial loop
  callback();
})
