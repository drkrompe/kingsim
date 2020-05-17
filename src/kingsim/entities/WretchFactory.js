import EntityManager from "../../ecs/managers/EntityManager";
import WorldPositionComponent from "../components/WorldPositionComponent";
import Entity from "../../ecs/entities/Entity";
import TypeComponent from '../components/TypeComponent';
import SelectableComponent from '../components/SelectableComponet';
import DilspriteComponent from '../components/DilspriteComponent';
import Dilsprite from '../../utils/dilsprite/Dilsprite';
import { DilActionAnimation } from '../../utils/dilsprite/dilactionanimation/DilActionAnimation';
import Human from '../textures/human/Human.png';
import Vec from "../../utils/Vec";


export default class WretchFactory {
    
    constructor(entityManager = new EntityManager()) {
        this.entityManager = entityManager;
    }
    
    create(at = Vec()) {
        const entity = new Entity();
        const type = new TypeComponent(entity, "wretch");
        const worldPosition = new WorldPositionComponent(entity, at);
        const dilsprite = new DilspriteComponent(entity, this._makeDilsprite(entity));
        const selectable = new SelectableComponent(entity);
        
        this.entityManager.addComponent(worldPosition);
        this.entityManager.addComponent(dilsprite);
        this.entityManager.addComponent(type);
        this.entityManager.addComponent(selectable);
    }

    _makeDilsprite(entity) {
        return new Dilsprite(Human, 4, 1, new DilActionAnimation({rows: 1, columns: 4}, 0, 2, 0.5));
    }
}