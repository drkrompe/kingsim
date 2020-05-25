import Task from "../Task";

export default class TaskFindAllTravelToAndDo extends Task {
    constructor(parent, findCompType, findCompTypePredicate, doTaskConstructor) {
        super(parent)
        this.taskData = {
            findCompType,
            findCompTypePredicate,
            doTaskConstructor
        }
    }
}