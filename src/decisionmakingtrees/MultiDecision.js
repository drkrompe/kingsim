import DecisionTreeNode from "./DecisionTreeNode";

export default class MultiDecision extends DecisionTreeNode {
    constructor(childNodes = [], testValue) {
        this.childNodes = childNodes;
        this.testValue = testValue;
    }

    getBranch() {
        return this.childNodes[this.testValue];
    }

    makeDecision() {
        const branch = this.getBranch();
        return branch.branch.makeDecision();
    }
}