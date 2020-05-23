import System from "../../../ecs/systems/System";

export default class KinematicUpdateSystem extends System {
    systemTick(timeDelta) {
        const kinematicComps = this._entityManager.getComponents('kinematic');
        kinematicComps.forEach(kinematicComp => {
            const steerComp = this._entityManager.getComponent('steering', kinematicComp.id);
            if (steerComp && steerComp.linear.length()) {
                // const posUpdate = kinematicComp.velocity.clone().multiplyScalar(timeDelta);
                // const orientUpdate = kinematicComp.rotation * timeDelta;
                // const velUpdate = steer.linear.clone().multiplyScalar(timeDelta);
                // const rotUpdate = steer.angular * timeDelta;
                // velUpdate.length() > 0 && kinematicComp.velocity.add(velUpdate);
                // kinematicComp.rotation += rotUpdate;
                
                const posUpdate = steerComp.linear.clone().multiplyScalar(timeDelta);
                const orientUpdate = steerComp.angular * timeDelta;
                posUpdate.length() > 0 && kinematicComp.position.add(posUpdate);
                kinematicComp.orientation += orientUpdate;
            }
        });
    }
}