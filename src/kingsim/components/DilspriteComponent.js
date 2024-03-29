import Component from "../../ecs/components/Component";
import Dilsprite from "../../utils/dilsprite/Dilsprite";
import SceneService from "../../services/SceneService";

export default class DilspriteComponent extends Component {
    constructor(entity, dilsprite = new Dilsprite()) {
        super(entity.id, "dilsprite");
        this.dilsprite = dilsprite;
        this.dilsprite.self = entity.id;
        SceneService.scene.add(this.dilsprite);
    }

    onDelete() {
        SceneService.scene.remove(this.dilsprite);
    }
}