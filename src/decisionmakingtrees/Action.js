import DecisionTreeNode from "./DecisionTreeNode";

export default class Action extends DecisionTreeNode{
    
    // Actions are terminal Decision Tree Nodes...
    // aka leaf nodes

    makeDecision() {
        return this;
    }
}