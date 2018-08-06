import { IComponent } from "./types";

export type Props = {
  //children: Array<GameObject>;
};

//todo: create unity-like multi-component
export default class GameObject implements IComponent {
  gameObjects: Array<IComponent>;
  classNames: Array<string>;

  constructor(public props, ...$classes) {
    this.gameObjects = $classes.map($class => new $class(props));

    //for serialization purposes
    this.classNames = $classes.map($class => $class.name);
    //this.props.children = [];
  }

  draw() {
    this.gameObjects.forEach(c => c.draw());
  }
  update(timestamp: number) {
    this.gameObjects.forEach(c => c.update(timestamp));
  }
}
