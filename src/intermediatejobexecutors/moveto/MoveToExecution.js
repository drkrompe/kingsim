import EntityManager from "../../ecs/managers/EntityManager"
import Entity from "../../ecs/entities/Entity"

export default (entityManager = new EntityManager(), entityId = "") => {
    const moveData = entityManager.getComponents('moveToTarget').find(moveToComp => moveToComp.id = entityId);
    console.log("moveTo data ",moveData)
}