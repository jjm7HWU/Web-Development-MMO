function display(foods, snakes, arena) {
  // Display canvas
  displayBackground();

  // Display all entities
  for (const food of foods) food.display();
  player.display();
  for (const snake of snakes) snake.display();

  // Display all entities' heads (temporary implementation)
  player.displayHead();
  for (const snake of snakes) snake.displayHead();

  // TODO: Display interface
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

    console.log("Server message: " + msg)
})

// on game state
socket.on("game state", function(gameState)
{
  let foods = gameState.foodItems;
  let snakes = gameState.snakes;
  let arena = gameState.arena;
  display(foods, snakes, arena);
})
