import System from "../../ecs/systems/System";

export default class MoveDilspriteToKinematicSystem extends System {
    systemTick(deltaTime) {
        const dilspriteComps = this._entityManager.getComponents("dilsprite");
        const kinematicComps = this._entityManager.getComponents("kinematic");
        kinematicComps.forEach(kinematicComp => {
            const dilspriteComp = dilspriteComps.find(meshComp => meshComp.id === kinematicComp.id);
            dilspriteComp.dilsprite.position.x = kinematicComp.position.x;
            dilspriteComp.dilsprite.position.y = kinematicComp.position.y;
        });
    }
}