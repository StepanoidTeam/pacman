import { IComponent, Point } from "./types";
import Sprite, { Props as SpriteProps } from "./sprite";
import { getRadians } from "./vectors";

export type Props = SpriteProps & {
  limits: Point;
  duration: number;
};

export default class Bouncer extends Sprite implements IComponent {
  constructor(public props: Props) {
    super(props);
  }

  update(timestamp) {
    super.update(timestamp);

    const { limits = [0.9, 1.1], duration = 5 } = this.props;

    //sin: -1...1
    const v01 = (1 + Math.sin(getRadians(timestamp / duration))) / 2;

    const diff = limits[1] - limits[0];
    this.props.scale = limits[0] + v01 * diff;
  }
}
