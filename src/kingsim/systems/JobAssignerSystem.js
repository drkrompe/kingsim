import System from "../../ecs/systems/System";
import DeciderLookup from "../../deciders/DeciderLookup";

export default class JobAssignerSystem extends System {
    systemTick(timeDelta) {
        const componentTypes = this._entityManager.getComponents("type");
        const componentJobs = this._entityManager.getComponents("job");

        componentTypes.forEach(typeComp => {
            const jobComp = componentJobs.find(comp => comp.id === typeComp.id);
            if (jobComp.terminalJob === 'none') {
                const decisionFunc = DeciderLookup.lookup(typeComp.type, 'jobAssign');
                jobComp.setJob(...decisionFunc());
            }
        });
    }
}