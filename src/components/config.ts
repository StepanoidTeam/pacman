import { Point } from "./types";

export const boundaries: Point = [1080, 720];
export const tileSize: Point = [60, 60];

export const canvas: HTMLCanvasElement = document.querySelector("#canvas");
export const ctx = canvas.getContext("2d");
