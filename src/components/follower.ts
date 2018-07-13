import { sortBy, head, random } from "lodash";

import { Point, IComponent, IPosition } from "./types";
import { distance, normalize, add, sub } from "./vectors";
import Sprite, { Props as SpriteProps } from "./sprite";

type Props = SpriteProps & {
  targets: Array<IPosition>;
};

export default class Folllower extends Sprite implements IComponent {
  velocity: Point;
  closest: Point;

  constructor(public props: Props) {
    super(props);
  }

  update() {
    const { targets, position } = this.props;

    const withDist = targets.map(p => ({
      position: p.props.position,
      distance: distance(p.props.position, position)
    }));

    this.closest = head(
      sortBy(targets.map(p => p.props.position), pos => distance(position, pos))
    );

    this.velocity = normalize(sub(this.closest, position));

    this.velocity = add(this.velocity, [random(-2, 2), random(-2, 2)]);

    // this.props.velocity = scalar(this.props.velocity, random(1, 2));

    this.props.position = add(position, this.velocity);
  }

  drawText(pt: Point, text: string) {
    const { ctx } = this.props;

    ctx.fillStyle = "black";
    ctx.font = "12px serif";
    ctx.fillText(text, pt[0], pt[1]);
  }

  draw() {
    super.draw();

    //this.drawText(position, this.closest.toString());

    // this.drawText(add(position, [0, -50]), velocity.toString());
    // this.drawText(
    //   add(position, [0, -100]),
    //   distance(this.closest, position).toString()
    // );
  }
}
