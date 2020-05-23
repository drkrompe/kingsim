export default class Task {
    constructor(parent = new Task()) {
        this.parent = parent;
        this.children = [];
        this.taskData = {
            
        }
    }

    addChildTask(childTask = new Task()) {
        childTask.parent = this;
        this.children.push(childTask);
    }

    isDone() {
        
    }

    doTask(timeDelta) {

    }
}