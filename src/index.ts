/// <reference path='./index.d.ts'/>

import { random, sample } from "lodash";

import pacman from "./images/Pacman.png";
import ghost1 from "./images/ghost-1.png";
import ghost2 from "./images/ghost-2.png";

import GameLoop from "./gameLoop";

import ClearScreen from "./components/clearScreen";
import Pacman from "./components/pacman";
import { Point, IComponent } from "./components/types";

import "./styles/index.less";
import Folllower from "./components/follower";

var canvas: HTMLCanvasElement = document.querySelector("#canvas");
var ctx = canvas.getContext("2d");

function batch(gcClass, count, getArgs) {
  return new Array(count).fill(null).map(() => new gcClass(getArgs()));
}

const boundaries: Point = [1080, 720];

const targets = batch(Pacman, 3, () => ({
  ctx,
  position: [random(canvas.width - 100), random(canvas.height - 100)],
  velocity: [1 - 2 * random(1), 1 - 2 * random(1)],
  image: sample([pacman]),
  size: [75, 75],
  boundaries
}));

const components: Array<IComponent> = [
  new ClearScreen({ ctx, boundaries }),

  //new Pacman({ ctx, position: [100, 100] }),

  ...batch(Folllower, 30, () => ({
    ctx,
    position: [random(canvas.width - 100), random(canvas.height - 100)],
    velocity: [1 - 2 * random(1), 1 - 2 * random(1)],
    image: sample([ghost1, ghost2]),
    size: [75, 75],
    boundaries,
    targets
  })),
  ...targets
];

new GameLoop({ components }).start();
