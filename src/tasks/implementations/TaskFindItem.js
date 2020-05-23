import Task from "../Task";

export default class TaskFindItem extends Task {
    constructor(parent, item) {
        super(parent);
        this.item = item;
    }
}