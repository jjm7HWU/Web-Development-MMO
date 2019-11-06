function update() {
  // Update all entities
  player.update();
  for (const snake of snakes) snake.update();
}

function display() {
  // Display canvas
  displayBackground();

  // Display all entities
  for (const food of foods) food.display();
  player.display();
  //for (const snake of snakes) snake.display();

  // Display all entities' heads (temporary implementation)
  player.displayHead();
  //for (const snake of snakes) snake.displayHead();

  // TODO: Display interface
}

/* Event listener for handling key presses */
document.addEventListener("keydown", event => {
  switch (event.keyCode) {
    case (87) : player.turn(0); break; // W KEY to go up
    case (68) : player.turn(1); break; // D KEY to go right
    case (83) : player.turn(2); break; // S KEY to go down
    case (65) : player.turn(3); break; // A KEY to go left
  }
});

// create canvas and get context
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Create player
let player = new Player(0,0);

// All to be relocated to server
// FROM HERE

let grid = [];
for (let i=0; i<100; i++) {
  let column = [];
  for (let j=0; j<100; j++) {
    column.push(-1);
  }
  grid.push(column);
}
let {snakes, foods} = createEntities();

// TEMPORARY - creates entities - will be done on server

// TO HERE

/* Main game loop */
setInterval(
  function() {
    update();
    display();
}, 200); // call every 200 milliseconds
