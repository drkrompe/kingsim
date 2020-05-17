import System from "../../ecs/systems/System";

export default class JobUpdaterSystem extends System {
    systemTick(deltaTime) {
        const jobComps = this._entityManager.getComponents('job');

        jobComps.forEach(component => {
            if (component.intermediateJobDone) {
                component.jobIndex++;
            } else if (component.terminalJobDone) {
                component.terminalJob = "none";
            }
        });
    }
}