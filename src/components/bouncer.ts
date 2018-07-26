import { IComponent, Point, Matrix } from "./types";
import Sprite, { Props as SpriteProps } from "./sprite";

type Props = SpriteProps & {};

export default class Bouncer extends Sprite implements IComponent {
  constructor(public props: Props) {
    super(props);
  }

  update(timestamp) {
    this.props.scale = 1 + Math.sin(((timestamp / 3) * Math.PI) / 180) / 10;
  }
}
