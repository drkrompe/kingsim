import Task from "../Task";

export default class TaskCollectAll extends Task {
    constructor(parent, collectCompType, collectCompTypePredicate) {
        super(parent);
        this.taskData = {
            collectCompType,
            collectCompTypePredicate
        };
    }
}