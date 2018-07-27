/// <reference path='./index.d.ts'/>

import { random, sample } from "lodash";

import { tileSize, boundaries, canvas } from "./components/config";

const berries = ["berry1", "berry2", "berry3"];
const targetImgs = ["cake"];
const followerImgs = ["ghost1", "ghost2", "pacman"];

import GameLoop from "./gameLoop";

import ClearScreen from "./components/clearScreen";
import Pacman from "./components/pacman";
import { Point, IComponent } from "./components/types";
import Folllower from "./components/follower";
import Level from "./components/level";

import "./styles/index.less";
import { scalar, sub, floor } from "./components/vectors";
import Rotator from "./components/rotator";

//dev
function batch(gcClass, count, getArgs) {
  return new Array(count).fill(null).map(() => new gcClass(getArgs()));
}

function getRandomPos(): Point {
  return [
    random(boundaries[0] - tileSize[0]),
    random(boundaries[1] - tileSize[1])
  ];
}

import level1 from "./levels/level-1.json";
import level2 from "./levels/level-2.json";
import level3 from "./levels/level-3.json";

import { saveData } from "./saveData";

const levels = [level1, level2, level3];

const level = new Level({
  data: levels[0]
});

const targets = batch(Pacman, 5, () => ({
  position: getRandomPos(),
  velocity: [1 - 2 * random(1), 1 - 2 * random(1)],
  image: sample(targetImgs),
  size: tileSize,
  boundaries
}));

const followers = batch(Folllower, 30, () => ({
  position: getRandomPos(),
  image: sample(followerImgs),
  size: tileSize,
  boundaries,
  targets
}));

const rotators = batch(Rotator, 20, () => ({
  position: [random(200, 500), random(200, 500)],
  image: sample(berries),
  size: tileSize,
  center: [350, 350],
  angle: 1 // random(1 / 4, 1 / 2, true)
}));

const components: Array<IComponent> = [
  new ClearScreen({ boundaries }),
  level,
  ...followers,
  ...targets,
  ...rotators
];

new GameLoop({ components }).start();

//controls
let drawItems = [
  position => ({
    type: "Bouncer",
    props: {
      position: position,
      size: tileSize,
      image: "cake"
    }
  }),
  position => ({
    type: "Bouncer",
    props: {
      position: position,
      size: tileSize,
      image: "dot"
    }
  }),
  position => ({
    type: "Sprite",
    props: {
      position: position,
      size: tileSize,
      image: "wall"
    }
  })
];

canvas.addEventListener("click", event => {
  const { offsetX, offsetY } = event;

  const offset: Point = [offsetX, offsetY];

  const alignToGrid = (position: Point, cellSize: number) =>
    scalar(floor(scalar(position, 1 / cellSize)), cellSize);

  let position = alignToGrid(offset, tileSize[0]);

  level.addItem(drawItems[0](position));
});

document.body.addEventListener("keypress", event => {
  const keyBindings = {
    s: () => {
      const data = level.save();
      saveData(data, "level-1.json");
    },
    n: () => {
      const next = levels.shift();
      levels.push(next);
      level.load(next);
    }
  };

  keyBindings[event.key]();
});

const controls = document.body.querySelector(".controls");

const ctrls = [
  {
    name: "save level",
    action: () => {
      const data = level.save();
      saveData(data, "level-1.json");
    }
  },
  {
    name: "next level",
    action: () => {
      const next = levels.shift();
      levels.push(next);
      level.load(next);
    }
  },
  {
    name: "prev tool",
    action: () => {
      const prev = drawItems.pop();
      drawItems.unshift(prev);
    }
  },
  {
    name: "next tool",
    action: () => {
      const next = drawItems.shift();
      drawItems.push(next);
    }
  },
  {
    name: "clear",
    action: () => {
      level.load([]);
    }
  }
];

ctrls
  .map(ctrl => {
    const elem = document.createElement("button");
    elem.innerText = ctrl.name;
    elem.addEventListener("click", ctrl.action);
    return elem;
  })
  .forEach(elem => controls.appendChild(elem));
