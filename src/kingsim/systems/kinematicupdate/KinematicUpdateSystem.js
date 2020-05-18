import System from "../../../ecs/systems/System";

export default class KinematicUpdateSystem extends System {
    systemTick(timeDelta) {
        const kinematicComps = this._entityManager.getComponents('kinematic');
        const steeringComps = this._entityManager.getComponents('steering');

        kinematicComps.forEach(kinematicComp => {
            const steer = steeringComps.find(steerComp => steerComp.id === kinematicComp.id);
            if (steer && steer.linear.length()) {
                // const posUpdate = kinematicComp.velocity.clone().multiplyScalar(timeDelta);
                // const orientUpdate = kinematicComp.rotation * timeDelta;
                // const velUpdate = steer.linear.clone().multiplyScalar(timeDelta);
                // const rotUpdate = steer.angular * timeDelta;
                // velUpdate.length() > 0 && kinematicComp.velocity.add(velUpdate);
                // kinematicComp.rotation += rotUpdate;
                
                const posUpdate = steer.linear.clone().multiplyScalar(timeDelta);
                const orientUpdate = steer.angular * timeDelta;
                posUpdate.length() > 0 && kinematicComp.position.add(posUpdate);
                kinematicComp.orientation += orientUpdate;
            }
        });
    }
}