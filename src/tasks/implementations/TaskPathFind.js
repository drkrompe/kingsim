import Task from "../Task";

export default class TaskPathFind extends Task {
    constructor(parent, to, from) {
        super(parent);
        this.taskData = {
            to: to,
            from: from,
        };
    }
}