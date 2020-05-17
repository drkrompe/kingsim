import Component from "../../ecs/components/Component";

export default class TypeComponent extends Component{
    constructor(entity, type="") {
        super(entity.id, "type");
        this.type = type;
    }
}