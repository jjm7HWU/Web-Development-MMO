// update all entities
function update() {
  // to be implemented
}

// display all entities
function display() {
  // to be implemented
}

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

setInterval(
  function() {
    update();
    display();
  }, 200);
