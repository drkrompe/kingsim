import Task from "../Task";

export default class TaskBuild extends Task {
    constructor(parent, eid) {
        super(parent);
        this.taskData = {
            eid: eid
        }
    }
}