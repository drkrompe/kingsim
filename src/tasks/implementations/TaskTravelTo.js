import Task from "../Task";

export default class TaskTravelTo extends Task {
    constructor(parent, to) {
        super(parent);
        this.taskData = {
            to: to,
        };
    }
}