/* Event listener for handling key presses */
document.addEventListener("keydown", event => {
  var n;
  switch (event.keyCode) {
    case (87) : n = 0; break; // W KEY to go up
    case (68) : n = 1; break; // D KEY to go right
    case (83) : n = 2; break; // S KEY to go down
    case (65) : n = 3; break; // A KEY to go left
    default : n = -1; break;
  }
  if (n != -1) socket.emit("update dir", n);
});

// create canvas and get context
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// configure initial measurements
configureCanvasMeasurements(canvas.width, canvas.height);
