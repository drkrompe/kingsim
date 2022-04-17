import React from 'react';
import * as THREE from 'three';
import {Vector2} from 'three';
import BaseRenderer from '../baserenderer/BaseRenderer';
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
import BuildingConstructionUpdateSystem
    from '../../kingsim/systems/buildingconstructionupdatesystem/BuildingConstructionUpdateSystem';
import WretchFactory from "../../kingsim/entities/WretchFactory";

export default class DemoWretch extends React.Component {

    componentDidMount() {
        this.clock = new THREE.Clock();
        const foodFactory = new FoodFactory(EntityManagerService);
        const wretchFactory = new WretchFactory(EntityManagerService);
        const wallFactory = new WallFactory(EntityManagerService);

        const createOnGrid = (factory, position) => {
            factory.create(
                GridOverlay.gridPositionToWorldPosition(
                    GridOverlay.worldPositionToGridPosition(position)
                )
            );
        }

        const createRandomFood = () => {
            let spaceInUse;
            let rand = [0, 0];
            let collisions = 0;
            do {
                spaceInUse = false;
                const genRand = () => Math.random() * 2 - 1;
                const genRandX = () => Math.random() * 4 - 2;
                rand = [genRandX(), genRand()]
                let kinematics = EntityManagerService.getComponents('kinematic');
                if (kinematics) {
                    for (let [key, value] of kinematics) {
                        const sameX = Math.abs(value.position.x - rand[0]) < 0.1;
                        const sameY = Math.abs(value.position.y - rand[1]) < 0.1;
                        if (sameX && sameY) {
                            collisions++;
                            spaceInUse = true;
                        }
                    }
                }
            } while (spaceInUse && collisions < 3);
            // check if space already in use

            if (collisions < 3) {
                createOnGrid(foodFactory, Vec(
                    ...rand
                ));
            }
        }

        const createXRandomFood = (x) => {
            for (let i = 0; i < x; i++) {
                createRandomFood();
            }
        }

        createXRandomFood(300);
        this.interval = setInterval(() => {
            createXRandomFood(100)
        }, 1000);

        wallFactory.create(new Vector2(-1, 3));
        wallFactory.create(new Vector2(-1, 1));
        wallFactory.create(new Vector2(-1, 0));
        wallFactory.create(new Vector2(-1, -1));
        wallFactory.create(new Vector2(-1, -2));
        wallFactory.create(new Vector2(-1, -3));
        wallFactory.create(new Vector2(-1, -5));
        wallFactory.create(new Vector2(-1, -6));
        wallFactory.create(new Vector2(-1, -7));
        wallFactory.create(new Vector2(-1, -8));
        wallFactory.create(new Vector2(-1, -9));
        wallFactory.create(new Vector2(0, -9));
        wallFactory.create(new Vector2(-1, -9));
        wallFactory.create(new Vector2(-2, 0));
        wallFactory.create(new Vector2(-3, -1));
        wallFactory.create(new Vector2(-4, -3));
        wallFactory.create(new Vector2(-5, -2));
        wallFactory.create(new Vector2(5, -2));
        wallFactory.create(new Vector2(4, -2));
        wallFactory.create(new Vector2(3, -2));
        wallFactory.create(new Vector2(2, -2));
        wallFactory.create(new Vector2(2, -1));
        wallFactory.create(new Vector2(2, -0));
        wallFactory.create(new Vector2(2, 1));
        wallFactory.create(new Vector2(2, 2));
        wallFactory.create(new Vector2(2, 3));
        wretchFactory.create(Vec(-1, 0));
        wretchFactory.create(Vec(-1, 0));
        wretchFactory.create(Vec(-1, 0));
        wretchFactory.create(Vec(-1, 0));
        wretchFactory.create(Vec(-1, 0));
        wretchFactory.create(Vec(-1, 0));
        wretchFactory.create(Vec(-1, 0));
        wretchFactory.create(Vec(-1, 0));
        wretchFactory.create(Vec(-1, 0));
        wretchFactory.create(Vec(-1, 0));
        wretchFactory.create(Vec(-1, 0));
        wretchFactory.create(Vec(-1, 0));
        wretchFactory.create(Vec(-1, 0));
        wretchFactory.create(Vec(-1, 0));
        wretchFactory.create(Vec(-1, 0));
        wretchFactory.create(Vec(-1, 0));
        wretchFactory.create(Vec(-1, 0));
        wretchFactory.create(Vec(-1, 0));
        wretchFactory.create(Vec(-1, 0));
        wretchFactory.create(Vec(-1, 0));
        wretchFactory.create(Vec(-1, 0));
        wretchFactory.create(Vec(-1, 0));
        wretchFactory.create(Vec(-1, 0));
        wretchFactory.create(Vec(-1, 0));
        wretchFactory.create(Vec(-1, 0));
        wretchFactory.create(Vec(-1, 0));
        wretchFactory.create(Vec(-1, 0));
        wretchFactory.create(Vec(-1, 0));
        wretchFactory.create(Vec(-1, 0));
        wretchFactory.create(Vec(-1, 0));
        wretchFactory.create(Vec(-1, 0));
        wretchFactory.create(Vec(-1, 0));
        wretchFactory.create(Vec(-1, 0));
        // new WretchFactory(EntityManagerService).create(Vec(-1, 0));
        // new WretchFactory(EntityManagerService).create(Vec(-1, 0));
        // new WretchFactory(EntityManagerService).create(Vec(-1, 0));
        // new WretchFactory(EntityManagerService).create(Vec(-1, 0));
        // new WretchFactory(EntityManagerService).create(Vec(-1, 0));
        // new WretchFactory(EntityManagerService).create(Vec(-1, 0));
        // new WretchFactory(EntityManagerService).create(Vec(-1, 0));
        // new WretchFactory(EntityManagerService).create(Vec(-1, 0));
        // new WretchFactory(EntityManagerService).create(Vec(-1, 0));
        // new WretchFactory(EntityManagerService).create(Vec(-1, 0));
        // new WretchFactory(EntityManagerService).create(Vec(-1, 0));
        // new WretchFactory(EntityManagerService).create(Vec(-1, 0));
        // new WretchFactory(EntityManagerService).create(Vec(-1, 0));
        // new WretchFactory(EntityManagerService).create(Vec(-1, 0));
        // new WretchFactory(EntityManagerService).create(Vec(-1, 0));
        // new WretchFactory(EntityManagerService).create(Vec(-1, 0));

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
        console.log("unmount")
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