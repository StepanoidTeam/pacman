/// <reference path='./index.d.ts'/>

import { random, sample } from "lodash";

import { tileSize, boundaries, canvas } from "./components/config";

const berries = ["berry1", "berry2", "berry3"];
const targetImgs = ["cake"];
const followerImgs = ["ghost1", "ghost2", "pacman"];

import GameLoop from "./gameLoop";

import ClearScreen from "./components/clearScreen";
import Pacman from "./components/mover";
import { Point, IComponent } from "./components/types";
import Folllower from "./components/follower";
import Level, { LevelItem } from "./components/level";

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
import Bouncer from "./components/bouncer";
import GameObject from "./components/GameObject";
import dynamicClass from "./components/dynamicClass";

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

var testProps = {
  position: getRandomPos(),
  velocity: [1 - 2 * random(1), 1 - 2 * random(1)] as Point,
  image: "ghost1",
  size: tileSize,
  boundaries
};

var testEntity = new GameObject(testProps, Bouncer);

console.log(testEntity);

const components: Array<IComponent> = [
  new ClearScreen({ boundaries }),
  level,
  //...followers,
  //...targets,
  //...rotators
  testEntity
];

new GameLoop({ components }).start();

//controls
let drawItems: Array<(...agrs) => LevelItem> = [
  position => ({
    classNames: ["Bouncer", "Rotator"],
    props: {
      position: position,
      size: tileSize,
      image: "cake",
      angle: random(-3, 3)
    }
  }),
  position => ({
    classNames: ["Bouncer"],
    props: {
      position: position,
      size: tileSize,
      image: "dot"
    }
  }),
  position => ({
    classNames: ["Sprite"],
    props: {
      position: position,
      size: tileSize,
      image: "wall"
    }
  }),
  position => ({
    classNames: ["Bouncer", "Mover"],
    props: {
      position: position,
      size: tileSize,
      image: "ghost2",
      velocity: [1, 1],
      boundaries: boundaries
    }
  })
];

canvas.addEventListener("click", event => {
  const { offsetX, offsetY } = event;

  const offset: Point = [offsetX, offsetY];

  const alignToGrid = (position: Point, cellSize: number) =>
    scalar(floor(scalar(position, 1 / cellSize)), cellSize);

  let position = alignToGrid(offset, tileSize[0]);

  let currentItem2add = drawItems[0](position);

  //todo: duplicate in level.ts
  let types = currentItem2add.classNames.map(dynamicClass);

  //const $class = dynamicClass(item.type);
  // const component = new $class(item.props);

  level.addItem(new GameObject(currentItem2add.props, ...types));
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
      document.title = prev.name;
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
