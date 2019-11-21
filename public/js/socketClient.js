function display(frameCounter, foods, player, snakes, arena) {

  currentOffset = getCurrentOffset(frameCounter);

  // Display canvas
  displayBackground(frameCounter);

  // cast player
  _player = new Snake(player);

  // Cast and display all entities
  for (const food of foods) {
    _food = new Food(food);
    if (0 <= _food.x <= player.x+X_PERIPHERAL && 0 <= _food.y <= player.y+Y_PERIPHERAL) _food.display(frameCounter);
  }
  _player.display();
  for (const snake of snakes) {
    _snake = new Snake(snake);
    _snake.display();
  }
}



// initialise websocket
var socket = io();

// elements variables
var form = document.getElementById("formInput")
var input = document.getElementById("m");
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

// on game state
socket.on("game state", function(gameState)
{
  // retrieve entities from game state
  foods = gameState.foodItems;
  snakes = gameState.snakes;
  arena = gameState.arena;

  // identify player
  player = snakes.find(function(snake){
    return snake.id == socket.id;
  });

  /* local loop for showing animated frames between server game loop */

  // time loop was last called (zero to call immediately)
  let lastTime = 0;
  // current animation frame
  let frameCounter = 0;

  const callback = (millis) => {
    if (millis-lastTime > 33) {                             // every 33ms
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
