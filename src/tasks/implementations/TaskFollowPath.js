import Task from "../Task";

export default class TaskFollowPath extends Task{
    constructor(parent, entity) {
        super(parent);
        this.entity = entity;
    }
}