import { IDraw, Point, IComponent } from "./types";

type Props = {
  ctx: CanvasRenderingContext2D;
  boundaries: Point;
};

export default class ClearScreen implements IComponent {
  constructor(public props: Props) {}

  update(timestamp: number) {}

  draw() {
    this.props.ctx.clearRect(
      0,
      0,
      this.props.boundaries[0],
      this.props.boundaries[1]
    );
  }
}
