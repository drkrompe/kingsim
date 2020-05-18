import Component from "../../ecs/components/Component";

export default class ArriveTargetComponent extends Component {
    constructor(entity) {
        super(entity.id, 'arrive-target');
        this.targetId = null;
    }
}