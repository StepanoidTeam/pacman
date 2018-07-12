import { sortBy, head, random } from "lodash";

import { Point, IComponent } from "./types";
import Sprite, { Props as SpriteProps } from "./sprite";
import Pacman from "./pacman";

type Props = SpriteProps & {
  velocity: Point;
  pacmans: Array<Pacman>;
};

function distance(pt1: Point, pt2: Point): number {
  return Math.sqrt((pt1[0] - pt2[0]) ** 2 + (pt1[1] - pt2[1]) ** 2);
}

function add(pt1: Point, pt2: Point): Point {
  return [pt1[0] + pt2[0], pt1[1] + pt2[1]];
}

function sub(pt1: Point, pt2: Point): Point {
  return add(pt1, scalar(pt2, -1));
}

function scalar(pt: Point, value: number): Point {
  return [pt[0] * value, pt[1] * value];
}

function normalize(pt: Point): Point {
  const zero: Point = [0, 0];
  const length = distance(zero, pt);

  return scalar(pt, 1 / length);
}

export default class Ghost extends Sprite implements IComponent {
  closest: Point;

  constructor(public props: Props) {
    super(props);
  }

  update() {
    const { velocity, pacmans, position } = this.props;

    const withDist = pacmans.map(p => ({
      position: p.props.position,
      distance: distance(p.props.position, position)
    }));

    const targets = sortBy(pacmans.map(p => p.props.position), pos =>
      distance(position, pos)
    );

    this.closest = head(targets);

    this.props.velocity = normalize(sub(this.closest, position));

    this.props.velocity = add(this.props.velocity, [
      random(-2, 2),
      random(-2, 2)
    ]);

    // this.props.velocity = scalar(this.props.velocity, random(1, 2));

    this.props.position = add(position, velocity);
  }

  drawText(pt: Point, text: string) {
    const { ctx } = this.props;

    ctx.fillStyle = "black";
    ctx.font = "12px serif";
    ctx.fillText(text, pt[0], pt[1]);
  }

  draw() {
    super.draw();

    const { position, velocity } = this.props;

    //this.drawText(position, this.closest.toString());

    // this.drawText(add(position, [0, -50]), velocity.toString());
    // this.drawText(
    //   add(position, [0, -100]),
    //   distance(this.closest, position).toString()
    // );
  }
}
