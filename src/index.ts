/// <reference path='./index.d.ts'/>

import * as _ from "lodash";

import pacman from "./images/Pacman.png";
import ghost1 from "./images/ghost-1.png";
import ghost2 from "./images/ghost-2.png";

import GameLoop from "./gameLoop";

import ClearScreen from "./components/clearScreen";
import Pacman from "./components/pacman";
import { Point } from "./components/types";

import "./styles/index.less";

var canvas: HTMLCanvasElement = document.querySelector("#canvas");
var ctx = canvas.getContext("2d");

function batch(gcClass, count, getArgs) {
  return new Array(count).fill(null).map(() => new gcClass(getArgs()));
}

const boundaries: Point = [1080, 720];

const components = [
  new ClearScreen({ ctx, boundaries }),

  //new Pacman({ ctx, position: [100, 100] }),

  ...batch(Pacman, 100, () => ({
    ctx,
    position: [_.random(canvas.width - 100), _.random(canvas.height - 100)],
    velocity: [1 - 2 * _.random(1), 1 - 2 * _.random(1)],
    image: _.sample([pacman, ghost1, ghost2]),
    size: [75, 75],
    boundaries
  }))
];

new GameLoop({ components }).start();
