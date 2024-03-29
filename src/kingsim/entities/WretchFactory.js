import EntityManager from "../../ecs/managers/EntityManager";
import Entity from "../../ecs/entities/Entity";
import TypingComponent from '../components/TypingComponent';
import DilspriteComponent from '../components/DilspriteComponent';
import Dilsprite from '../../utils/dilsprite/Dilsprite';
import { DilActionAnimation } from '../../utils/dilsprite/dilactionanimation/DilActionAnimation';
import Human from '../textures/human/Human.png';
import Vec from "../../utils/Vec";
import KinematicComponent from "../components/KinematicComponent";
import SpeedComponent from "../components/SpeedComponent";
import SteeringComponent from "../components/SteeringComponent";
import ArriveTargetComponent from "../components/ArriveTargetComponent";
import TaskComponent from "../components/TaskComponent";
import PathComponent from "../components/PathComponent";
import QueryComponent from "../components/QueryComponent";
import PathFindComponent from "../components/PathFindComponent";
import GridPositionComponent from "../components/GridPositionComponent";
import BuilderComponent from "../components/BuilderComponent";
import TaskBuildAndGather from "../../tasks/implementations/TaskBuildAndGather";


export default class WretchFactory {
    
    constructor(entityManager = new EntityManager()) {
        this.entityManager = entityManager;
    }
    
    create(at = Vec(0,0)) {
        const entity = new Entity();
        const typing = new TypingComponent(entity, "wretch");
        const kinematic = new KinematicComponent(entity);
        const gridPosition = new GridPositionComponent(entity);
        const dilsprite = new DilspriteComponent(entity, this._makeDilsprite(entity));
        const speed = new SpeedComponent(entity);
        const steering = new SteeringComponent(entity);
        const arriveTarget = new ArriveTargetComponent(entity);
        const query = new QueryComponent(entity, null);
        const path = new PathComponent(entity, null);
        const pathFind = new PathFindComponent(entity, null);
        const builder = new BuilderComponent(entity);
        const task = new TaskComponent(entity, new TaskBuildAndGather(null));


        speed.maxSpeed = 0.25;
        kinematic.position.x = at.x;
        kinematic.position.y = at.y;
        dilsprite.dilsprite.scale.x = 0.1
        dilsprite.dilsprite.scale.y = 0.1
        
        this.entityManager.addComponent(typing);
        this.entityManager.addComponent(kinematic);
        this.entityManager.addComponent(gridPosition);
        this.entityManager.addComponent(dilsprite);
        this.entityManager.addComponent(speed);
        this.entityManager.addComponent(steering);
        this.entityManager.addComponent(arriveTarget);
        this.entityManager.addComponent(query);
        this.entityManager.addComponent(path);
        this.entityManager.addComponent(pathFind);
        this.entityManager.addComponent(task);
        this.entityManager.addComponent(builder);

        return entity;
    }

    _makeDilsprite(entity) {
        return new Dilsprite(Human, 4, 1, new DilActionAnimation({rows: 1, columns: 4}, 0, 2, 0.5));
    }
}