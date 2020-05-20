import State from "./State";
import Condition from "./Condition";

export default class Transition {
    constructor(actions = [], targetState = new State(), condition = new Condition()) {
        this.actions = actions;
        this.targetState = targetState;
        this.condition = condition;
    }

    getAction() {
        return this.actions;
    }

    getTargetState() {
        return this.targetState;
    }

    isTriggered() {
        return this.condition.test();
    }
}