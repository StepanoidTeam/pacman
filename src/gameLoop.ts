export default class GameLoop {
  components: Array<any>;

  constructor({ components }) {
    this.components = components || [];
    this.start();
  }

  draw() {
    this.components.forEach(c => c.draw());
  }

  update(timestamp) {
    this.components.forEach(c => c.update(timestamp));
  }

  gameLoop(timestamp = performance.now()) {
    this.update(timestamp);
    this.draw();
    requestAnimationFrame(timestamp => this.gameLoop(timestamp));
  }

  start() {
    requestAnimationFrame(timestamp => this.gameLoop(timestamp));
  }

  stop() {
    //todo: impl stop?
  }
}
