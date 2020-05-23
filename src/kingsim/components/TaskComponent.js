import Component from "../../ecs/components/Component";
import Task from '../../tasks/Task';

export default class TaskComponent extends Component{
    constructor(entity, task = new Task()) {
        super(entity.id, "task");
        this.task = task;
    }
}