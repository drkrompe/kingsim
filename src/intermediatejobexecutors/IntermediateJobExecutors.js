import MoveToExecution from "./moveto/MoveToExecution";

export default class IntermediateJobExecutors {
    static lookupTable = new Map(['MoveTo', MoveToExecution]);

    static lookup = (intermediateJobType = "") => {
        return this.lookupTable.get(intermediateJobType);
    }
}