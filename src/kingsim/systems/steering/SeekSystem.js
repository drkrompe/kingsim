import System from "../../../ecs/systems/System";
import { Vector2 } from "three";

export default class SeekSystem extends System {
    systemTick(timeDelta) {
        const kinematicComps = this._entityManager.getComponents('kinematic');
        const steeringComps = this._entityManager.getComponents('steering');
        const seekTargetComps = this._entityManager.getComponents('seek-target');
        const speedComps = this._entityManager.getComponents('speed');
        
        seekTargetComps.forEach(seekTargetComp => {
            if (seekTargetComp.targetId) {
                const selfSteering = steeringComps.find(comp => comp.id === seekTargetComp.id);
                const selfKinematic = kinematicComps.find(comp => comp.id === seekTargetComp.id);
                const targetKinematic = kinematicComps.find(comp => comp.id === seekTargetComp.targetId);
                const selfSpeed = speedComps.find(comp => comp.id === seekTargetComp.id);
                
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