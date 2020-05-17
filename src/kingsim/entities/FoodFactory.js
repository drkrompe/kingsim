import EntityManager from "../../ecs/managers/EntityManager";
import Entity from "../../ecs/entities/Entity";
import DilspriteComponent from "../components/DilspriteComponent";
import WorldPositionComponent from "../components/WorldPositionComponent";
import TypeComponent from "../components/TypeComponent";
import Dilsprite from "../../utils/dilsprite/Dilsprite";

import Food from '../textures/food/Food.png';
import { DilActionAnimation } from "../../utils/dilsprite/dilactionanimation/DilActionAnimation";
import Vec from "../../utils/Vec";

export default class FoodFactory {
    constructor(entityManager = new EntityManager()) {
        this._entityManager = entityManager;
    }

    create(at = Vec()) {
        const entity = new Entity();
        const type = new TypeComponent(entity, "food");
        const worldPosition = new WorldPositionComponent(entity, at);
        const dilsprite = new DilspriteComponent(entity, this._makeDilsprite(entity));
        
        this._entityManager.addComponent(type);
        this._entityManager.addComponent(worldPosition);
        this._entityManager.addComponent(dilsprite);
    }

    _makeDilsprite(entity){
        return new Dilsprite(Food, 4, 1, new DilActionAnimation({ rows: 1, columns: 4 }, 0, 0, 50));
    }
}