import System from "../../ecs/systems/System";

export default class MoveDilspriteToWorldLocationService extends System {
    systemTick(deltaTime) {
        const meshes = this._entityManager.getComponents("dilsprite");
        const positions = this._entityManager.getComponents("world-position");
        positions.forEach(pos => {
            const mesh = meshes.find(meshComp => meshComp.entityId === pos.entityId);
            mesh.dilsprite.position.x = pos.position.x;
            mesh.dilsprite.position.y = pos.position.y;
        });
    }
}