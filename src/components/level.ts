import { IComponent, Point } from "./types";
import { tileSize } from "./config";

import Sprite from "./sprite";

import dot from "../images/dot-1.png";
import wall from "../images/wall-1.png";

export enum LevelType {
  WALL,
  DOT
  //   FRUIT,
  //   PACMAN,
  //   GHOST
}

const mapping = {
  [LevelType.WALL]: wall,
  [LevelType.DOT]: dot
};

export type Props = {
  data: Array<Array<LevelType>>;
  ctx: CanvasRenderingContext2D;
};

export default class Level implements IComponent {
  sprites: Array<Sprite> = [];

  constructor(public props: Props) {
    const { data, ctx } = this.props;

    this.sprites = [].concat(
      ...data.map((row, rowIndex) =>
        row.map((cellType, colIndex) => {
          const position: Point = [
            tileSize[0] * colIndex,
            tileSize[1] * rowIndex
          ];
          return this.createTile(position, cellType);
        })
      )
    );
  }

  addTile(position: Point, cellType: LevelType): void {
    this.sprites.push(this.createTile(position, cellType));
  }

  createTile(position: Point, cellType: LevelType): Sprite {
    return new Sprite({
      ctx: this.props.ctx,
      position,
      size: tileSize,
      image: mapping[cellType]
    });
  }

  draw() {
    this.sprites.forEach(c => c.draw());
  }

  update(timestamp: number) {}
}
