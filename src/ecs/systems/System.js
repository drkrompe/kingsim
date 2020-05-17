import EntityManager from "../managers/EntityManager";

export default class System {

    constructor(
        entityManager = new EntityManager()
    ) {
        this._entityManager = entityManager;
    }

    systemTick(timeDelta) {
        
    }

}