"use strict";

import FpsCounter from "./components/fpsCounter";
import Pacman from "./components/pacman";

import "./styles/index.less";

document.title = "pacman is coming...";

var canvas = document.querySelector("#canvas");
var ctx = canvas.getContext("2d");

function clearScreen() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}

const gameComponents = [
	new FpsCounter({ ctx, position: [20, 100] }),
	new Pacman({ ctx, position: [100, 100] })
];

function gameLoop(timestamp = performance.now()) {
	clearScreen();

	ctx.fillStyle = "green";
	ctx.fillRect(10, 10, 100, 100);

	gameComponents.forEach(gc => gc.update(timestamp));

	gameComponents.forEach(gc => gc.draw());

	requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
