import { Vector2 } from "three";
import Entity from "../../ecs/entities/Entity";
import TypingComponent from '../components/TypingComponent';
import KinematicComponent from '../components/KinematicComponent';
import EntityManager from "../../ecs/managers/EntityManager";

export default class WayPointFactory{
    constructor(entityManager = new EntityManager()) {
        this._entityManager = entityManager;
    }

    create(position = new Vector2()) {
        const entity = new Entity();
        
        const typing = new TypingComponent(entity, "way-point");
        const kinematic = new KinematicComponent(entity);
        kinematic.position = position;

        this._entityManager.addComponent(typing);
        this._entityManager.addComponent(kinematic);
        
        return entity;
    }
}