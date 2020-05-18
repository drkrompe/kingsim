import EntityManager from "../../ecs/managers/EntityManager";
import Entity from "../../ecs/entities/Entity";
import TypeComponent from '../components/TypeComponent';
import DilspriteComponent from '../components/DilspriteComponent';
import Dilsprite from '../../utils/dilsprite/Dilsprite';
import { DilActionAnimation } from '../../utils/dilsprite/dilactionanimation/DilActionAnimation';
import Human from '../textures/human/Human.png';
import Vec from "../../utils/Vec";
import KinematicComponent from "../components/KinematicComponent";
import SpeedComponent from "../components/SpeedComponent";
import SteeringComponent from "../components/SteeringComponent";
import ArriveTargetComponent from "../components/ArriveTargetComponent";


export default class WretchFactory {
    
    constructor(entityManager = new EntityManager()) {
        this.entityManager = entityManager;
    }
    
    create(at = Vec(0,0), targetId = null) {
        const entity = new Entity();
        const type = new TypeComponent(entity, "wretch");
        const kinematic = new KinematicComponent(entity);
        const dilsprite = new DilspriteComponent(entity, this._makeDilsprite(entity));
        const speed = new SpeedComponent(entity);
        const steering = new SteeringComponent(entity);
        const arriveTarget = new ArriveTargetComponent(entity);

        speed.maxSpeed = 1;
        arriveTarget.targetId = targetId;
        kinematic.position.x = at.x;
        kinematic.position.y = at.y;
        
        this.entityManager.addComponent(type);
        this.entityManager.addComponent(kinematic);
        this.entityManager.addComponent(dilsprite);
        this.entityManager.addComponent(speed);
        this.entityManager.addComponent(steering);
        this.entityManager.addComponent(arriveTarget);

        return entity;
    }

    _makeDilsprite(entity) {
        return new Dilsprite(Human, 4, 1, new DilActionAnimation({rows: 1, columns: 4}, 0, 2, 0.5));
    }
}