import { Point, IComponent } from "./types";

type Props = {
  ctx: CanvasRenderingContext2D;
  position: Point;
  size: Point;
  velocity: Point;
  boundaries: Point;
  img: HTMLImageElement;
  image: string;
};

export default class Pacman implements IComponent {
  constructor(public props: Props) {
    this.props.img = new Image();
    this.props.img.src = this.props.image;
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

  draw() {
    const { ctx, img, position, size = [75, 75] } = this.props;

    //if (this.isLoaded)
    ctx.drawImage(img, position[0], position[1], size[0], size[1]);
  }
}
