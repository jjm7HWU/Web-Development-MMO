function random(min, max) {
  /* Return random integer n in range min <= n <= max */
  let range = max - min;
  return min + Math.floor(Math.random()*(range+1));
}

function decToHex(decimal) {
  /* Convert decimal int to hexadecimal string */
  let output = "";
  let p = 1, a;
  while (decimal > 0) {
    a = decimal % 16;
    output = "0123456789abcdef"[a] + output;
    decimal = Math.floor(decimal / 16);
  }
  return output;
}

function randomColor() {
  /* Return random hexadecimal color code */
  return "#"+decToHex(random(0,255))+decToHex(random(0,255))+decToHex(random(0,255));
}

function redirectPlayer() {
  /* Redirect player to home screen */
  window.location.href = "/"; // temporary location - will only work remotely
}

function getSine(n) {
  /* Get sine of number - negative number returns -1, positive number returns 1 */
  return (n < 0) ? -1 : 1;
}

function getTouchPosition(event) {
  /* Get position of finger on touch screen */
  let touch = event.touches[0];   // get touch of one finger on screen
  let touchX = touch.clientX;     // get x position of finger
  let touchY = touch.clientY;     // get y position of finger

  /* return position */
  return {x: touchX, y: touchY};
}

function getTurnDirectionTouch(initialPosition, positionNow) {
  /* Determine turn direction of player given changes in finger position */

  // calculate horizontal and vertical changes in finger position
  var xChange = positionNow.x - initialTouch.x;
  var yChange = positionNow.y - initialTouch.y;

  // find most significant change in axis position
  if (Math.abs(xChange) > Math.abs(yChange)) {      // change on x-axis most significant
    return (getSine(xChange) == -1) ? 3 : 1;        // LEFT returns 3, RIGHT returns 1
  }
  else {                                            // change on y-axis most significant or the same
    return (getSine(yChange) == -1) ? 0 : 2;        // UP returns -1, DOWN returns 2
  }
}

function typeOfCell(cell) {
  /* Specify type of given cell */
  if (typeof(cell) == "object") {
    return cell.type;
  }
  else {
    return;
  }
}
