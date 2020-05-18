import Component from "../../ecs/components/Component";

export default class SeekTargetComponent extends Component {
    constructor(entity) {
        super(entity.id, 'seek-target');
        this.targetId = null;
    }
}