import React from 'react';
import * as THREE from 'three';
import BaseRenderer from '../baserenderer/BaseRenderer';
import WretchFactory from '../../kingsim/entities/WretchFactory';
import EntityManagerService from '../../services/EntityManagerService';
import AnimateDilspriteSystem from '../../kingsim/systems/AnimateDilspriteSystem';
import FoodFactory from '../../kingsim/entities/FoodFactory';
import Vec from '../../utils/Vec';
import MoveDilspriteToKinematicSystem from '../../kingsim/systems/MoveDilspriteToKinematicSystem';
import KinematicUpdateSystem from '../../kingsim/systems/kinematicupdate/KinematicUpdateSystem';
import ArriveSystem from '../../kingsim/systems/steering/ArriveSystem';
import TaskSystem from '../../kingsim/systems/tasksystem/TaskSystem';
import PathFollowSystem from '../../kingsim/systems/pathfollowsystem/PathFollowSystem';
import QuerySystem from '../../kingsim/systems/querysystem/QuerySystem';
import PathFindSystem from '../../kingsim/systems/pathfindsystem/PathFindSystem';
import MoveGridPositionToKinematicPositionSystem from '../../kingsim/systems/MoveGridPositionToKinematicSystem';
import GridOverlay from '../../kingsim/overlays/GridOverlay';
import WallFactory from '../../kingsim/entities/buildings/WallFactory';
import { Vector2 } from 'three';
import BuildingConstructionUpdateSystem from '../../kingsim/systems/buildingconstructionupdatesystem/BuildingConstructionUpdateSystem';

export default class DemoWretch extends React.Component {

    componentDidMount() {
        this.clock = new THREE.Clock();
        const foodFactory = new FoodFactory(EntityManagerService);

        const createAt = (factory, position) => {
            factory.create(position);
        }

        const createOnGrid = (factory, position) => {
            factory.create(
                GridOverlay.gridPositionToWorldPosition(
                    GridOverlay.worldPositionToGridPosition(position)
                )
            );
        }

        const createRandomFood = () => {
            const genRand = () => Math.random() * 2 - 1
            const rand = [genRand(), genRand()]
            createOnGrid(foodFactory, Vec(
                ...rand                
            ));
        }

        const createXRandomFood = (x) => {
            Array.from(Array(x)).forEach(() => {
                createRandomFood();
            });
        }

        createXRandomFood(30);
        this.interval = setInterval(() => {
            createXRandomFood(60)
        }, 5000);

        new WallFactory(EntityManagerService).create(new Vector2(-1, 3));
        new WallFactory(EntityManagerService).create(new Vector2(-1, 1));
        new WallFactory(EntityManagerService).create(new Vector2(-1, 0));
        new WallFactory(EntityManagerService).create(new Vector2(-1, -1));
        new WallFactory(EntityManagerService).create(new Vector2(-1, -2));
        new WallFactory(EntityManagerService).create(new Vector2(-1, -3));
        new WallFactory(EntityManagerService).create(new Vector2(-1, -5));
        new WallFactory(EntityManagerService).create(new Vector2(-1, -6));
        new WallFactory(EntityManagerService).create(new Vector2(-1, -7));
        new WallFactory(EntityManagerService).create(new Vector2(-1, -8));
        new WallFactory(EntityManagerService).create(new Vector2(-1, -9));
        new WallFactory(EntityManagerService).create(new Vector2(0, -9));
        new WallFactory(EntityManagerService).create(new Vector2(1, -9));
        new WretchFactory(EntityManagerService).create(Vec(-1, 0));
        new WretchFactory(EntityManagerService).create(Vec(-1, 0));
        new WretchFactory(EntityManagerService).create(Vec(-1, 0));
        new WretchFactory(EntityManagerService).create(Vec(-1, 0));
        new WretchFactory(EntityManagerService).create(Vec(-1, 0));
        new WretchFactory(EntityManagerService).create(Vec(-1, 0));
        new WretchFactory(EntityManagerService).create(Vec(-1, 0));
        new WretchFactory(EntityManagerService).create(Vec(-1, 0));
        new WretchFactory(EntityManagerService).create(Vec(-1, 0));
        new WretchFactory(EntityManagerService).create(Vec(-1, 0));
        new WretchFactory(EntityManagerService).create(Vec(-1, 0));
        new WretchFactory(EntityManagerService).create(Vec(-1, 0));
        new WretchFactory(EntityManagerService).create(Vec(-1, 0));
        new WretchFactory(EntityManagerService).create(Vec(-1, 0));
        new WretchFactory(EntityManagerService).create(Vec(-1, 0));
        new WretchFactory(EntityManagerService).create(Vec(-1, 0));
        new WretchFactory(EntityManagerService).create(Vec(-1, 0));

        this.systems = [
            new AnimateDilspriteSystem(EntityManagerService),
            new KinematicUpdateSystem(EntityManagerService),
            new MoveDilspriteToKinematicSystem(EntityManagerService),
            new ArriveSystem(EntityManagerService),
            new TaskSystem(EntityManagerService),
            new PathFindSystem(EntityManagerService),
            new PathFollowSystem(EntityManagerService),
            new QuerySystem(EntityManagerService),
            new MoveGridPositionToKinematicPositionSystem(EntityManagerService),
            new BuildingConstructionUpdateSystem(EntityManagerService)
        ];

        this.props.updateFunctions.push(this.onTick);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    onTick = () => {
        const timeDelta = this.clock.getDelta();
        this.systems.forEach(system => {
            system.systemTick(timeDelta);
        });
    }

    render() {
        return (
            <>
                <BaseRenderer {...this.props} />
            </>
        )
    }
}