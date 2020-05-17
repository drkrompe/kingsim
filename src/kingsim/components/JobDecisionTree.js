import Component from "../../ecs/components/Component";

export default class JobDecisionTreeComponent extends Component {
    constructor(entity, decisionTree) {
        super(entity.id, "job-decision-tree");
        this.decisionTree = decisionTree;
    }
}