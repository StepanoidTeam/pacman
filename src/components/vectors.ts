import { Point } from "./types";

export function distance(pt1: Point, pt2: Point): number {
  return Math.sqrt((pt1[0] - pt2[0]) ** 2 + (pt1[1] - pt2[1]) ** 2);
}

export function add(pt1: Point, pt2: Point): Point {
  return [pt1[0] + pt2[0], pt1[1] + pt2[1]];
}

export function sub(pt1: Point, pt2: Point): Point {
  return add(pt1, scalar(pt2, -1));
}

export function scalar(pt: Point, value: number): Point {
  return [pt[0] * value, pt[1] * value];
}

export function normalize(pt: Point): Point {
  const zero: Point = [0, 0];
  const length = distance(zero, pt);

  return scalar(pt, 1 / length);
}

export function floor(pt: Point): Point {
  return pt.map(x => Math.floor(x)) as Point;
}
