import { IComponent } from "./types";

//todo: create unity-like multi-component
export default class GameObject implements IComponent {
  components: Array<IComponent> = [];

  constructor(public props, ...$classes) {
    this.components = $classes.map($class => new $class(props));
  }

  draw() {
    this.components.forEach(c => c.draw());
  }
  update(timestamp: number) {
    this.components.forEach(c => c.update(timestamp));
  }
}
