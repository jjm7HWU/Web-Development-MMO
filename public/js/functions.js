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
  window.location.href = "http://localhost:5000/"; // temporary location - will only work remotely
}
