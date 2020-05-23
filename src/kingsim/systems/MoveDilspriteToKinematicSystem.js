import System from "../../ecs/systems/System";

export default class MoveDilspriteToKinematicSystem extends System {
    systemTick(deltaTime) {
        const dilspriteComps = this._entityManager.getComponents("dilsprite");
        dilspriteComps.forEach(dilspriteComp => {
            const kinematicComp = this._entityManager.getComponent('kinematic', dilspriteComp.id);
            dilspriteComp.dilsprite.position.x = kinematicComp.position.x;
            dilspriteComp.dilsprite.position.y = kinematicComp.position.y;
        });
    }
}