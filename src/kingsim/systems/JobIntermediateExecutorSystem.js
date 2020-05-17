import System from "../../ecs/systems/System";
import IntermediateJobExecutors from "../../intermediatejobexecutors/IntermediateJobExecutors";

export default class JobIntermediateExecutorSystem extends System {
    systemTick(timeDelta) {
        const jobComps = this._entityManager.getComponents('job');
        jobComps.forEach(jobComp => {
            if (!jobComp.intermediateJobDone) {
                const execFunc = IntermediateJobExecutors.lookup(jobComp.jobTree[jobComp.jobIndex]);
                execFunc(this._entityManager, jobComp.id);
            }
        })
    }
}