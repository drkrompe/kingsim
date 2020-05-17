import System from "../../ecs/systems/System";

export default class AnimateDilspriteSystem extends System {
    systemTick(timeDelta) {
        this._entityManager.getComponents("dilsprite").forEach(component => {
            component.dilsprite.animate(timeDelta);
        });
    }
}