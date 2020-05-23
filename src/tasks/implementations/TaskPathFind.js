import Task from "../Task";

export default class TaskPathFind extends Task {
    constructor(parent, to) {
        super(parent);
        this.taskData = {
            to: to,
        };
    }
}