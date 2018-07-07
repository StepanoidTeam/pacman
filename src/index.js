import * as _ from "lodash";

import GameLoop from "./gameLoop";
import FpsCounter from "./components/fpsCounter";
import Pacman from "./components/pacman";

import pacman from "./images/Pacman.png";
import ghost1 from "./images/ghost-1.png";
import ghost2 from "./images/ghost-2.png";

import "./styles/index.less";

document.title = "pacman is coming...";

var canvas = document.querySelector("#canvas");
var ctx = canvas.getContext("2d");

function batch(gcClass, count, getArgs) {
	return new Array(count).fill(null).map(() => new gcClass(getArgs()));
}

const components = [
	//new Pacman({ ctx, position: [100, 100] }),

	...batch(Pacman, 100, () => ({
		ctx,
		position: [_.random(canvas.width - 100), _.random(canvas.height - 100)],
		velocity: [1 - 2 * _.random(1), 1 - 2 * _.random(1)],
		image: _.sample([pacman, ghost1, ghost2])
	})),

	new FpsCounter({
		ctx,
		position: [40, 40]
	})
];

new GameLoop({ ctx, components }).start();
