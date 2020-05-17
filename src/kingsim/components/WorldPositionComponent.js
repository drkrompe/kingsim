import Component from "../../ecs/components/Component"
import Vec from "../../utils/Vec";

export default class WorldPositionComponent extends Component {
    constructor(entity, defaultLocation = Vec(0, 0)) {
        super(entity.id, "world-position");
        this.position = defaultLocation;
    }
}