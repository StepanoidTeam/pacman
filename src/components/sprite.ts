import { Point, IPosition, IComponent } from "./types";
import { tileSize } from "./config";
import { getRadians } from "./vectors";

export type Props = {
  ctx: CanvasRenderingContext2D;
  position: Point;
  size: Point;
  image: string;
  scale?: number;
  rotate?: number;
};

export default class Sprite implements IComponent, IPosition {
  img: HTMLImageElement = new Image();

  constructor(public props: Props) {
    this.img.src = this.props.image;
    this.props.rotate = 0;
    this.props.scale = 1;
  }

  drawImage() {
    const { ctx, scale, rotate, position, size } = this.props;

    ctx.setTransform(
      scale,
      0,
      0,
      scale,
      position[0] + size[0] / 2,
      position[1] + size[1] / 2
    );
    ctx.rotate(getRadians(rotate));
    //ctx.drawImage(this.img, -this.img.width / 2, -this.img.height / 2);
    //ctx.fillRect(0, 0, size[0], size[1]);
    ctx.drawImage(this.img, -size[0] / 2, -size[1] / 2, size[0], size[1]);
  }

  draw() {
    const { ctx, position, size = tileSize } = this.props;

    //debug

    this.drawImage();
    //this.drawImage(this.img, position[0], position[1], size[0], size[1]);
  }
  update(timestamp: number) {}
}
