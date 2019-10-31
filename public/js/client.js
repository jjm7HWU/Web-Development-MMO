// update all entities
function update() {
  player.update();
  for (const snake of snakes) snake.update();
}

// display all entities
function display() {
  displayBackground();
  player.display();
  for (const snake of snakes) snake.display();
  player.displayHead();
  for (const snake of snakes) snake.displayHead();
}

document.addEventListener("keydown", event => {
  switch (event.keyCode) {
    case (87) : player.turn(0); break;
    case (68) : player.turn(1); break;
    case (83) : player.turn(2); break;
    case (65) : player.turn(3); break;
  }
}
);

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let player = new Player(0,0);
let snakes = [];
for (let c = 0; c < 100; c++) {
  snakes.push(new Snake(random(-10,10), random(-10,10)));
}

setInterval(
  function() {
    update();
    display();
  }, 200);
