import Component from "../../ecs/components/Component";

export default class JobComponent extends Component {
    constructor(entity, terminalJob="none", jobIndex=0, jobTree=[]) {
        super(entity.id, "job");
        this.terminalJob = terminalJob;
        this.jobIndex = jobIndex;
        this.jobTree = jobTree;
        this.intermediateJobDone = false;
        this.terminalJobDone = false;
    }

    setJob = (terminalJob, jobIndex = 0, jobTree = []) => {
        this.terminalJob = terminalJob;
        this.jobIndex = jobIndex;
        this.jobTree = jobTree;
        this.intermediateJobDone = false;
        this.terminalJobDone = false;
    }
}

// JobTree
// Eat thing
// MoveTo, PickUp, Eat

// Component ["MoveTo", "PickUp", "Eat"]

// System will
// Take MoveTo and run corresponding logic until "done"
// When done Set index to next