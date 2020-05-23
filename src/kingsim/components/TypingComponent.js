import Component from "../../ecs/components/Component";

export default class TypingComponent extends Component{
    constructor(entity, typing="") {
        super(entity.id, "typing");
        this.typing = typing;
    }
}