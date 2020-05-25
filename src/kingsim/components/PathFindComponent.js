import Component from "../../ecs/components/Component";

export default class PathFindComponent extends Component {
    constructor(entity, to = null, from = null) {
        super(entity.id, "path-find");
        this.to = to; // null or vector2 ?
        this.from = from;
    }
}