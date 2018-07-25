import { IDraw, Point, IComponent } from "./types";

type Props = {
  ctx: CanvasRenderingContext2D;
  boundaries: Point;
};

export default class ClearScreen implements IComponent {
  constructor(public props: Props) {}

  update(timestamp: number) {}

  draw() {
    const { ctx } = this.props;

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, this.props.boundaries[0], this.props.boundaries[1]);
  }
}
