import System from "../../../ecs/systems/System";
import WayPointFactory from "../../entities/WayPointFactory";
import { Vector2 } from "three";

export default class PathFollowSystem extends System {
    systemTick(timeDelta) {
        // - if entity.path === null
        // -    continue
        // - elif entity.path !== null and entity.path.length > 0
        // -    if entity.arriveTarget === null
        // -        entity.arriveTarget = path.pop(0)
        // - elif entity.path !== null and entity.path.length === 0
        // -    if entity.arriveTarget === null
        // -        entity.path = null
        const pathComps = this._entityManager.getComponents('path');
        if (!pathComps) return;
        pathComps.forEach(pathComp => {
            if (pathComp.path === null) {

            } else if (pathComp.path.length > 0) {
                const arriveTargetComp = this._entityManager.getComponent('arrive-target', pathComp.id);
                if (arriveTargetComp.targetId === null) {
                    const wayPointEntity = this._vector2ToWayPointEntity(pathComp.path.shift()); // Vector2
                    arriveTargetComp.targetId = wayPointEntity.id;
                } else {
                    // assumed moving to current arrive target
                }
            } else {
                const arriveTargetComp = this._entityManager.getComponent('arrive-target', pathComp.id);
                if (arriveTargetComp.targetId === null) {
                    pathComp.path = null;
                }
            }
        });
    }

    _vector2ToWayPointEntity = (position = new Vector2()) => {
        return new WayPointFactory(this._entityManager).create(position);
    }
}