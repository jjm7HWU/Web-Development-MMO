function update() {
  // TODO implement
}

let lastTime;
const callback = (millis) => {
  if (lastTime) {
    update();
  }
  lastTime = millis;
  requestAnimationFrame(callback);
}
callback();
