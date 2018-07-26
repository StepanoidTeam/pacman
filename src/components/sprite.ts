import { Point, IPosition, IComponent, Draw } from "./types";
import { tileSize, ctx } from "./config";
import { getRadians } from "./vectors";
import ImageLib from "../images/index";

export type Props = {
  position: Point;
  size: Point;
  image: string;
  scale?: number;
  rotate?: number;
};

export default class Sprite extends Draw implements IComponent, IPosition {
  ctx: CanvasRenderingContext2D = ctx;
  img: HTMLImageElement = new Image();

  constructor(public props: Props) {
    super();
    this.img.src = ImageLib.get(this.props.image);
  }

  draw() {
    const { scale = 1, rotate = 0, position, size } = this.props;

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
  update(timestamp: number) {}
}
