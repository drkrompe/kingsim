import System from "../../../ecs/systems/System";
import { Vector2 } from "three";

export default class PathFindSystem extends System {
    systemTick(timeDelta) {
        const pathFindComps = this._entityManager.getComponents('path-find');
        pathFindComps.forEach(pathFindComp => {
            if (pathFindComp.to !== null) {
                const path = this._pathFind(pathFindComp.to);
                const pathComp = this._entityManager.getComponent('path', pathFindComp.id);
                pathComp.path = path;
                pathFindComp.to = null;
            }
        });
    }


    _pathFind = (to = new Vector2()) => {
        return [to];
    }
}