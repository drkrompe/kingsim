import Task from "../Task";

export default class TaskPickUp extends Task {
    constructor(parent, eid) {
        super(parent);
        this.taskData = {
            eid: eid,
        }
    }
}