import Component from "../../ecs/components/Component";

export default class JobComponent extends Component {
    constructor(entity, job="none") {
        super(entity.id, "job");
        this.job = job;
    }
}