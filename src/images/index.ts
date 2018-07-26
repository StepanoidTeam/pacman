/// <reference path='./index.d.ts'/>

import pacman from "./Pacman.png";
import ghost1 from "./ghost-1.png";
import ghost2 from "./ghost-2.png";

import cake from "./cake.png";
import berry1 from "./berries-1.png";
import berry2 from "./berries-2.png";
import berry3 from "./berries-3.png";

import dot from "./dot-1.png";

import wall from "./wall-1.png";

import error from "./error.png";

class ImageLib {
  constructor(public images) {}

  get(imageId: string) {
    const image = this.images[imageId];
    if (!image) {
      console.warn(`'${imageId}' image not found`);
      return error;
    }
    return image;
  }
}

export default new ImageLib({
  pacman,
  ghost1,
  ghost2,

  cake,

  berry1,
  berry2,
  berry3,

  dot,
  wall
});
