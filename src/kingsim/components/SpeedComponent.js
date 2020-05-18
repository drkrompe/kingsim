import Component from "../../ecs/components/Component";

export default class SpeedComponent extends Component {
    constructor(entity) {
        super(entity.id, 'speed');
        this.maxSpeed = 0;
    }
}