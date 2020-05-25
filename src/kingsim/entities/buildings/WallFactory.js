import BuildingFactory from '../BuildingFactory';
import Entity from '../../../ecs/entities/Entity';
import TypingComponent from '../../components/TypingComponent';
import BuildingComponent from '../../components/BuildingComponent';
import DilspriteComponent from '../../components/DilspriteComponent';
import Dilsprite from '../../../utils/dilsprite/Dilsprite';
import Wall from '../../textures/wall/Wall.png';
import { DilActionAnimation } from '../../../utils/dilsprite/dilactionanimation/DilActionAnimation';
import KinematicComponent from '../../components/KinematicComponent';
import GridPositionComponent from '../../components/GridPositionComponent';
import GridOverlay from '../../overlays/GridOverlay';

export default class WallFactory extends BuildingFactory {

    create(atGrid) {
        const entity = new Entity();
        
        const typing = new TypingComponent(entity, "wall");
        const kinematic = new KinematicComponent(entity);
        const gridPosition = new GridPositionComponent(entity);
        const dilsprite = new DilspriteComponent(entity, this._createDilsprite());
        const building = new BuildingComponent(entity);

        const gridToWorld = GridOverlay.gridPositionToWorldPosition(atGrid);
        kinematic.position.x = gridToWorld.x;
        kinematic.position.y = gridToWorld.y;
        dilsprite.dilsprite.scale.x = 0.1;
        dilsprite.dilsprite.scale.y = 0.1;

        building.onBuiltDilActionAnimation = new DilActionAnimation({ rows: 1, columns: 4 }, 1, 0, 50);

        this._entityManager.addComponent(typing);
        this._entityManager.addComponent(kinematic);
        this._entityManager.addComponent(gridPosition);
        this._entityManager.addComponent(dilsprite);
        this._entityManager.addComponent(building);

        return entity;
    }

    _createDilsprite = () => {
        return new Dilsprite(Wall, 4, 1, new DilActionAnimation({ rows: 1, columns: 4 }, 0, 0, 50));
    }
}