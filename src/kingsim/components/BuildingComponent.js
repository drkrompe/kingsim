import Component from "../../ecs/components/Component";

export default class BuildingComponent extends Component {
    constructor(entity) {
        super(entity.id, "building");
        this.workProgress = 0;
        this.workAmount = 100;
        this.isBuilt = false;
        this.onBuiltDilActionAnimation = null;
    }
}