import System from "../../../ecs/systems/System";
import { Vector2 } from "three";

export default class SeekSystem extends System {
    systemTick(timeDelta) {
        const seekTargetComps = this._entityManager.getComponents('seek-target');
        
        seekTargetComps.forEach(seekTargetComp => {
            if (seekTargetComp.targetId) {
                const selfSteering = this._entityManager.getComponent('steering', seekTargetComp.id);
                const selfKinematic = this._entityManager.getComponent('kinematic', seekTargetComp.id);
                const targetKinematic = this._entityManager.getComponent('kinematic', seekTargetComp.targetId);
                const selfSpeed = this._entityManager.getComponent('speed', seekTargetComp.id);
                
                selfSteering.linear = targetKinematic.position.clone().sub(selfKinematic.position)
                .normalize().multiplyScalar(selfSpeed.maxSpeed);

                selfSteering.angular = 0;
                
                selfKinematic.orientation = this._velocityToRadianOrientation(selfKinematic.orientation, selfSteering.linear);
            }
        });
    }

    _velocityToRadianOrientation = (selfOrientation, velocity = new Vector2()) => {
        if (velocity.length() <= 0) {
            return selfOrientation;
        }
        return Math.atan2(velocity.y, velocity.x);
    }
}