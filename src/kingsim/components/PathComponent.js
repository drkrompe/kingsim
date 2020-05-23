import Component from "../../ecs/components/Component";

export default class PathComponent extends Component {
    constructor(entity, path = null) {
        super(entity.id, "path");
        this.path = path; // null or []
    }
}