import Component from "../../ecs/components/Component";

export default class BuilderComponent extends Component {
    constructor(entity) {
        super(entity.id, "builder");
        this.work = 1;
    }
}