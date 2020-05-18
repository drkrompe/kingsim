import Component from "../../ecs/components/Component";
import { Vector2 } from "three";

export default class SteeringComponent extends Component {
    constructor(entity) {
        super(entity.id, "steering");
        this.linear = new Vector2(); // acceleration in x,y
        this.angular = 0; // turn accel in radians
    }
}