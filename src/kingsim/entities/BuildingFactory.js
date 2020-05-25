import EntityManager from "../../ecs/managers/EntityManager";

export default class BuildingFactory {
    constructor(entityManager = new EntityManager()) {
        this._entityManager = entityManager;
    }
    
    create(at, shape) {

    }
}