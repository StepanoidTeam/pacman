import { Point, IComponent } from "./types";
import Sprite, { Props as SpriteProps } from "./sprite";

type Props = SpriteProps & {
  velocity: Point;
  boundaries: Point;
};

export default class Pacman extends Sprite implements IComponent {
  constructor(public props: Props) {
    super(props);
  }

  update() {
    const { boundaries, size, velocity } = this.props;

    this.props.position = this.props.position.map((x, i) => {
      if (x > boundaries[i] - size[i] || x < 0) {
        velocity[i] *= -1;
      }

      return x + velocity[i];
    }) as Point;
  }
}
