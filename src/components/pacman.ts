import { Point } from "./types";

type Params = {
  ctx: CanvasRenderingContext2D;
  position: Point;
  size: Point;
  velocity: Point;
  boundaries: Point;
};

export default class Pacman {
  ctx: CanvasRenderingContext2D;
  position: Point;
  size: Point;
  velocity: Point;
  boundaries: Point;
  img: HTMLImageElement;

  constructor({ ctx, position, velocity = [1, 1], image }) {
    this.ctx = ctx;
    this.position = position;
    this.size = [75, 75];
    this.velocity = velocity as Point;

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
    }) as Point;
  }

  draw() {
    //if (this.isLoaded)
    this.ctx.drawImage(
      this.img,
      this.position[0],
      this.position[1],
      this.size[0],
      this.size[1]
    );
  }
}
