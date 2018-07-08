import { Point } from "./types";

export default class FpsCounter {
  position: Point;
  prevStamp: any;
  frameCount: number;
  prevFrameCount: number;
  ctx: CanvasRenderingContext2D;

  constructor({ ctx, position }) {
    this.position = position;
    this.prevStamp = null;
    this.frameCount = 0;
    this.prevFrameCount = 0;

    this.ctx = ctx;
    this.prevStamp = performance.now();
  }
  //todo: add enable/disable methods/gettersetters

  update(timestamp = performance.now()) {
    const delta = timestamp - this.prevStamp;
    this.frameCount++;

    if (delta > 1000) {
      this.prevStamp = timestamp;
      this.prevFrameCount = this.frameCount;
      this.frameCount = 0;
    }
  }
  draw() {
    this.ctx.fillStyle = "black";
    this.ctx.font = "22px serif";
    this.ctx.fillText(
      this.prevFrameCount.toString(),
      this.position[0],
      this.position[1]
    );
  }
}
