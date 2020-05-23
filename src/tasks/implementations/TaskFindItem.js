import Task from "../Task";
import { Query } from "../../querys/QueryExecutor";

export default class TaskFindItem extends Task {
    constructor(parent, query = new Query()) {
        super(parent);
        this.taskData = {
            query: query
        };
    }
}