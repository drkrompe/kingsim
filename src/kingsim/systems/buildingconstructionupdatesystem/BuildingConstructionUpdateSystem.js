import System from "../../../ecs/systems/System";

export default class BuildingConstructionUpdateSystem extends System {
    systemTick(timeDelta) {
        const buildingComps = this._entityManager.getComponents('building');
        buildingComps.forEach(buildingComp => {
            if (buildingComp.isBuilt === true) {
                // do nothing exit quick
            }else if (buildingComp.workProgress >= buildingComp.workAmount) {
                buildingComp.isBuilt = true;
                const dilspriteComp = this._entityManager.getComponent('dilsprite', buildingComp.id);
                dilspriteComp.dilsprite.dilActionAnimation = buildingComp.onBuiltDilActionAnimation;
            }
        });
    }
}