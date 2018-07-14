/// <reference path='./index.d.ts'/>

import { random, sample } from "lodash";

import pacman from "./images/Pacman.png";
import ghost1 from "./images/ghost-1.png";
import ghost2 from "./images/ghost-2.png";

import cake from "./images/cake.png";
import berry1 from "./images/berries-1.png";
import berry2 from "./images/berries-2.png";
import berry3 from "./images/berries-3.png";

const targetImgs = [cake, berry1, berry2, berry3];
const followerImgs = [ghost1, ghost2, pacman];

import { tileSize, boundaries } from "./components/config";

import GameLoop from "./gameLoop";

import ClearScreen from "./components/clearScreen";
import Pacman from "./components/pacman";
import { Point, IComponent } from "./components/types";
import Folllower from "./components/follower";
import Level, { LevelType } from "./components/level";

import "./styles/index.less";

var canvas: HTMLCanvasElement = document.querySelector("#canvas");
var ctx = canvas.getContext("2d");

function batch(gcClass, count, getArgs) {
  return new Array(count).fill(null).map(() => new gcClass(getArgs()));
}

function getRandomPos() {
  return [
    random(canvas.width - tileSize[0]),
    random(canvas.height - tileSize[1])
  ];
}

const level = new Level({
  data: [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [
      LevelType.WALL,
      LevelType.DOT,
      LevelType.DOT,
      LevelType.DOT,
      LevelType.WALL
    ],
    [
      LevelType.WALL,
      LevelType.DOT,
      LevelType.WALL,
      LevelType.DOT,
      LevelType.WALL
    ]
  ],
  ctx
});

const targets = batch(Pacman, 5, () => ({
  ctx,
  position: getRandomPos(),
  velocity: [1 - 2 * random(1), 1 - 2 * random(1)],
  image: sample(targetImgs),
  size: tileSize,
  boundaries
}));

const followers = batch(Folllower, 30, () => ({
  ctx,
  position: getRandomPos(),
  image: sample(followerImgs),
  size: tileSize,
  boundaries,
  targets
}));

const components: Array<IComponent> = [
  new ClearScreen({ ctx, boundaries }),
  level,
  ...followers,
  ...targets
];

new GameLoop({ components }).start();
