import { BADHINTS } from "dns";

import image from "../images/Pacman.png";

export default class Pacman {
	constructor({ ctx, position }) {
		this.ctx = ctx;
		this.position = this.position;

		this.img = image;
	}

	update() {}

	draw() {
		this.ctx.drawImage(this.img, ...this.position);
	}
}
