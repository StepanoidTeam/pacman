import { IComponent, Point, Matrix } from "./types";
import Sprite, { Props as SpriteProps } from "./sprite";
import { scalar, add, sub, mtxProduct, getRotationMtx } from "./vectors";

function rotate(point: Point, angle: number): Point {
  const rotMtx = getRotationMtx(angle);

  return mtxProduct(point, rotMtx);
}

type Props = SpriteProps & {
  center: Point;
  angle: number;
};

export default class Rotator extends Sprite implements IComponent {
  val = 0;
  constructor(public props: Props) {
    super(props);
  }

  update(timestamp) {
    const { position, center, angle } = this.props;

    let pos = sub(position, center);

    let posRot = rotate(pos, angle);

    this.props.position = add(posRot, center);

    this.props.rotate -= 1;
    this.val += 2;
    this.props.scale = 1.5 + Math.sin((this.val * Math.PI) / 180) / 5;
  }
}
