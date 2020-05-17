import System from "../../ecs/systems/System";

export default class MoveMeshToWorldLocationSystem extends System {
    systemTick(deltaTime) {
        const meshes = this._entityManager.getComponents("dilsprite");
        const positions = this._entityManager.getComponents("world-position");
        positions.forEach(pos => {
            const mesh = meshes.find(meshComp => meshComp.entityId === pos.entityId);
            mesh.mesh.position.x = pos.position.x;
            mesh.mesh.position.y = pos.position.y;
        });
    }
}