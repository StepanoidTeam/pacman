import { IComponent } from "./types";
import dynamicClass from "./dynamicClass";

export type LevelItem = { type: string; props: any };
export type LevelData = Array<LevelItem>;

export type Props = {
  data: LevelData;
};

export default class Level implements IComponent {
  name = this.name;
  components: Array<IComponent> = [];

  constructor(public props: Props) {
    const { data } = this.props;
    this.components = [];

    this.load(data);
  }

  load(data: LevelData) {
    data.forEach(this.addItem, this);
  }

  addItem(item: LevelItem) {
    const $class = dynamicClass(item.type);
    const component = new $class(item.props);

    this.components.push(component);
  }

  save() {
    function compMapper(c: IComponent) {
      return {
        type: c.constructor.name,
        props: c.props
      } as LevelItem;
    }

    const data = this.components.map(compMapper);

    return data;
  }

  draw() {
    this.components.forEach(c => c.draw());
  }

  update(timestamp: number) {
    this.components.forEach(c => c.update(timestamp));
  }
}
