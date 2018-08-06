import { IComponent } from "./types";
import dynamicClass from "./dynamicClass";
import GameObject from "./GameObject";

export type LevelItem = {
  classNames: Array<string>;
  props: any;
};
export type LevelData = Array<LevelItem>;

export type Props = {
  data: LevelData;
};

export default class Level extends GameObject implements IComponent {
  gameObjects: Array<GameObject> = [];

  constructor(public props: Props) {
    super(props);
    const { data } = this.props;

    this.load(data);
  }

  load(data: LevelData) {
    this.gameObjects = [];

    data
      .map((item: LevelItem) => {
        let types = item.classNames.map(dynamicClass);

        return new GameObject(item.props, ...types);
      })
      .forEach(this.addItem, this);
  }

  addItem(go: GameObject) {
    this.gameObjects.push(go);
  }

  save() {
    function goMapper(c: GameObject) {
      return {
        classNames: c.classNames,
        props: c.props
      } as LevelItem;
    }

    const data = this.gameObjects.map(goMapper);

    return data;
  }

  draw() {
    this.gameObjects.forEach(c => c.draw());
  }

  update(timestamp: number) {
    this.gameObjects.forEach(c => c.update(timestamp));
  }
}
