import System from "../../ecs/systems/System";
import GridOverlay from "../overlays/GridOverlay";

export default class MoveGridPositionToKinematicPositionSystem extends System {
    systemTick(timeDelta) {
        const gridPositionComps = this._entityManager.getComponents('grid-position');
        gridPositionComps.forEach(gridPositionComp => {
            const kinematicComp = this._entityManager.getComponent('kinematic', gridPositionComp.id);
            gridPositionComp.gridPosition = GridOverlay.worldPositionToGridPosition(kinematicComp.position);
        });
    }
}