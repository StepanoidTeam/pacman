import { Point, IDraw, IPosition, IUpdate } from "./types";
import { tileSize } from "./config";

export type Props = {
  ctx: CanvasRenderingContext2D;
  position: Point;
  size: Point;
  image: string;
};

export default class Sprite implements IDraw, IUpdate, IPosition {
  img: HTMLImageElement = new Image();

  constructor(public props: Props) {
    this.img.src = this.props.image;
  }

  draw() {
    const { ctx, position, size = tileSize } = this.props;

    //debug
    //ctx.fillRect(position[0], position[1], size[0], size[1]);

    ctx.drawImage(this.img, position[0], position[1], size[0], size[1]);
  }
  update(timestamp: number) {}
}
