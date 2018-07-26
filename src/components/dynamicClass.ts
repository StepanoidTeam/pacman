import Sprite from "./sprite";
import Folllower from "./follower";
import ClearScreen from "./clearScreen";
import Rotator from "./rotator";
import Pacman from "./pacman";
import Bouncer from "./bouncer";

const classes = {
  Sprite,
  Folllower,
  ClearScreen,
  Rotator,
  Pacman,
  Bouncer
};

export default function dynamicClass(name) {
  return classes[name];
}
