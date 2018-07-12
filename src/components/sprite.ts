import { Point, IDraw } from "./types";

export type Props = {
  ctx: CanvasRenderingContext2D;
  position: Point;
  size: Point;

  img: HTMLImageElement;
  image: string;
};

export default class Sprite implements IDraw {
  constructor(public props: Props) {
    this.props.img = new Image();
    this.props.img.src = this.props.image;
  }

  draw() {
    const { ctx, img, position, size = [75, 75] } = this.props;

    ctx.drawImage(img, position[0], position[1], size[0], size[1]);
  }
}
