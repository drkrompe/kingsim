import Component from "../../ecs/components/Component";

export default class MeshComponent extends Component{
    constructor(entity, mesh) {
        super(entity.id, "mesh");
        this.mesh = mesh;
    }
}