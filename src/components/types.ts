export type Point = [number, number];

export type Matrix = [Point, Point];

export interface IPosition {
  props: {
    position: Point;
  };
}

export interface IDraw {
  draw();
}

export interface IUpdate {
  update(timestamp: number);
}

export interface IComponent extends IDraw, IUpdate {}
