import {Clock} from 'three'
import DecisionTreeNode from "./DecisionTreeNode";


export default class RandomDecision extends DecisionTreeNode {
    constructor(trueNode, falseNode, chance = 0.5, timeoutTime=null) {
        super();
        this.lastDecision = null;
        this.trueNode = trueNode;
        this.falseNode = falseNode;
        this.chance = chance;
        this.timeoutTime = timeoutTime;
        this.lastDecisionTime = 0;
        if (timeoutTime === null) {
            this.clock = new Clock();
        }
    }

    getBranch() {
        // If there is a timeout... then reset decision
        // if enough time has passed
        if (this.timeoutTime) {
            this.lastDecisionTime -= this.clock.getDelta();
            if (this.lastDecisionTime <= 0) {
                this.lastDecisionTime = this.timeoutTime;
                this.lastDecision = null;
            }
        }
        // If no last decision then make new last decision
        if (this.lastDecision === null) {
            this.lastDecision = (Math.random() >= this.chance)
        }
        return this.lastDecision ? this.trueNode : this.falseNode;
    }

    makeDecision() {
        const branch = this.getBranch();
        return branch.makeDecision();
    }
}