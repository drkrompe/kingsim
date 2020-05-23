import System from "../../../ecs/systems/System";
import { Vector2 } from "three";

export default class ArriveSystem extends System {

    acceptableDistance = 0.00;
    timeToTarget = 0.25;

    systemTick(timeDelta) {
        const arriveTargetComps = this._entityManager.getComponents('arrive-target');

        arriveTargetComps.forEach(arriveTargetComp => {
            if (arriveTargetComp.targetId) {
                const selfSteering = this._entityManager.getComponent('steering', arriveTargetComp.id);
                const selfKinematic = this._entityManager.getComponent('kinematic', arriveTargetComp.id);
                const targetKinematic = this._entityManager.getComponent('kinematic', arriveTargetComp.targetId);
                const selfSpeed = this._entityManager.getComponent('speed', arriveTargetComp.id);

                const directionTo = targetKinematic.position.clone().sub(selfKinematic.position);
                const distanceToTarget = directionTo.length();
                
                if (distanceToTarget < this.acceptableDistance) { // if close enough stop
                    selfSteering.linear = new Vector2();
                } else { // as get closer slow down
                    const speedNeededToTarget = directionTo.clone().divideScalar(this.timeToTarget);
                    if (speedNeededToTarget.length() > selfSpeed.maxSpeed) { // speed needed greater than max
                        selfSteering.linear = speedNeededToTarget.normalize().multiplyScalar(selfSpeed.maxSpeed);
                    } else { // slow to needed
                        selfSteering.linear = speedNeededToTarget;
                    }
                }

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
