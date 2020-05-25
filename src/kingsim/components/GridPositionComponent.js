import Component from "../../ecs/components/Component";
import { Vector2 } from "three";

export default class GridPositionComponent extends Component {
    constructor(entity, gridPosition = new Vector2()) {
        super(entity.id, "grid-position");
        this.gridPosition = gridPosition;
    }
}