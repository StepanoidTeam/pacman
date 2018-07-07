export default class GameLoop {
	constructor({ ctx, components }) {
		this.components = components || [];
		this.ctx = ctx;

		this.start();
	}

	clearScreen() {
		this.ctx.clearRect(0, 0, canvas.width, canvas.height);
	}

	draw() {
		this.clearScreen();
		this.components.forEach(c => c.draw());
	}

	update(timestamp) {
		this.components.forEach(c => c.update(timestamp));
	}

	gameLoop(timestamp = performance.now()) {
		this.draw();
		this.update(timestamp);
		requestAnimationFrame(timestamp => this.gameLoop(timestamp));
	}

	start() {
		requestAnimationFrame(timestamp => this.gameLoop(timestamp));
	}

	stop() {
		//?
	}
}
