import image from "../images/Pacman.png";

export default class Pacman {
	constructor({ ctx, position }) {
		this.ctx = ctx;
		this.position = position;
		this.size = [150, 150];
		this.velocity = [10, 10];

		this.boundaries = [1080, 720];

		this.img = new Image();
		this.img.src = image;
	}

	update() {
		this.position = this.position.map((x, i) => {
			if (x > this.boundaries[i] - this.size[i] || x < 0) {
				this.velocity[i] *= -1;
			}

			return x + this.velocity[i];
		});
	}

	draw() {
		//if (this.isLoaded)
		this.ctx.drawImage(this.img, ...this.position, ...this.size);
	}
}
