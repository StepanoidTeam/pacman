"use strict";

import fpsCounter from "./components/fpsCounter";

import "./styles/index.less";

document.title = "pacman is coming...";

var canvas = document.querySelector("#canvas");
var ctx = canvas.getContext("2d");

function clearScreen() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}

const gameComponents = [new fpsCounter({ ctx, position: [20, 100] })];

function gameLoop(timestamp = performance.now()) {
	clearScreen();

	ctx.fillStyle = "green";
	ctx.fillRect(10, 10, 100, 100);

	gameComponents.forEach(gc => gc.update(timestamp));

	gameComponents.forEach(gc => gc.draw());

	requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
