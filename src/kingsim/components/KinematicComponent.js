import Component from "../../ecs/components/Component";
import { Vector2 } from "three";

export default class KinematicComponent extends Component {
    constructor(entity) {
        super(entity.id, "kinematic");
        this.position = new Vector2(0,0);
        this.orientation = 0; // radians
        this.velocity = new Vector2(0,0);
        this.rotation = 0; // radians;

        // position = 2d location in world
        // orientation = radian angle of rotation of object
        // velocity = 2d velocity movement in world
        // roation = radian angle of change of object orientation
    }
}