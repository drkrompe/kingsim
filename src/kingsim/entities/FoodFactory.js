import EntityManager from "../../ecs/managers/EntityManager";
import Entity from "../../ecs/entities/Entity";
import DilspriteComponent from "../components/DilspriteComponent";
import TypingComponent from "../components/TypingComponent";
import Dilsprite from "../../utils/dilsprite/Dilsprite";

import Food from '../textures/food/Food.png';
import { DilActionAnimation } from "../../utils/dilsprite/dilactionanimation/DilActionAnimation";
import Vec from "../../utils/Vec";
import KinematicComponent from "../components/KinematicComponent";

export default class FoodFactory {
    constructor(entityManager = new EntityManager()) {
        this._entityManager = entityManager;
    }

    create(at = Vec(0,0)) {
        const entity = new Entity();
        const type = new TypingComponent(entity, "food");
        const kinematic = new KinematicComponent(entity);
        const dilsprite = new DilspriteComponent(entity, this._makeDilsprite(entity));
        
        kinematic.position.x = at.x;
        kinematic.position.y = at.y;
        
        this._entityManager.addComponent(type);
        this._entityManager.addComponent(kinematic);
        this._entityManager.addComponent(dilsprite);

        return entity;
    }

    _makeDilsprite(entity){
        const dilsprite = new Dilsprite(Food, 4, 1, new DilActionAnimation({ rows: 1, columns: 4 }, 0, 0, 50));
        dilsprite.dilTag = "food"
        return dilsprite;
    }
}