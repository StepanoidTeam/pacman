import { Draw, Point, IComponent } from "./types";

type Props = {
  boundaries: Point;
};

export default class ClearScreen extends Draw implements IComponent {
  constructor(public props: Props) {
    super();
  }

  update(timestamp: number) {}

  draw() {
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.clearRect(
      0,
      0,
      this.props.boundaries[0],
      this.props.boundaries[1]
    );
  }
}
