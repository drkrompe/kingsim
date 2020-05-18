import System from "../../../ecs/systems/System";
import { Vector2 } from "three";

export default class ArriveSystem extends System {

    acceptableDistance = 0.00;
    timeToTarget = 0.25;

    systemTick(timeDelta) {
        const kinematicComps = this._entityManager.getComponents('kinematic');
        const steeringComps = this._entityManager.getComponents('steering');
        const arriveTargetComps = this._entityManager.getComponents('arrive-target');
        const speedComps = this._entityManager.getComponents('speed');

        arriveTargetComps.forEach(seekTargetComp => {
            if (seekTargetComp.targetId) {
                const selfSteering = steeringComps.find(comp => comp.id === seekTargetComp.id);
                const selfKinematic = kinematicComps.find(comp => comp.id === seekTargetComp.id);
                const targetKinematic = kinematicComps.find(comp => comp.id === seekTargetComp.targetId);
                const selfSpeed = speedComps.find(comp => comp.id === seekTargetComp.id);

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
