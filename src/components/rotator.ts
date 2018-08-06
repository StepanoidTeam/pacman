import { IComponent } from "./types";
import Sprite, { Props as SpriteProps } from "./sprite";

type Props = SpriteProps & {
  angle: number;
};

export default class Rotator extends Sprite implements IComponent {
  constructor(public props: Props) {
    super(props);
    this.props.rotate = 0;
  }

  update(timestamp) {
    super.update(timestamp);

    this.props.rotate += this.props.angle;
  }
}
