import Component from "../../ecs/components/Component";

export default class SelectableComponent extends Component {
    constructor(entity) {
        super(entity.id, "selectable")
        this.selectable = true;
    }
}