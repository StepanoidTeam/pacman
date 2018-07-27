import Sprite from "./sprite";
import Folllower from "./follower";
import ClearScreen from "./clearScreen";
import Rotator from "./rotator";
import Mover from "./mover";
import Bouncer from "./bouncer";

const classes = {
  Sprite,
  Folllower,
  ClearScreen,
  Rotator,
  Mover,
  Bouncer
};

export default function dynamicClass(name) {
  return classes[name];
}
