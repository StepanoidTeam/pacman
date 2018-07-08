export type Point = [number, number];

export interface IDraw {
  draw();
}

export interface IUpdate {
  update(timestamp: number);
}

export interface IComponent extends IDraw, IUpdate {}
