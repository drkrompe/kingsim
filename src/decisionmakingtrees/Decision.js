import DecisionTreeNode from "./DecisionTreeNode";

export default class Decision extends DecisionTreeNode {
    constructor(trueNode, falseNode, testValue) {
        super();
        this.trueNode = trueNode;
        this.falseNode = falseNode;
        this.testValue = testValue;
    }

    getBranch() {
        // Here goes logic to go true or false based on testvalue
        if (this.testValue) {
            return this.trueNode;
        } else {
            return this.falseNode;
        }
    }

    makeDecision() {
        const branch = this.getBranch();
        return branch.makeDecision();
    }
} 