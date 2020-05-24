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

export default class DemoWretch extends React.Component {

    componentDidMount() {
        this.clock = new THREE.Clock();
        const foodFactory = new FoodFactory(EntityManagerService);

        const createRandomFood = () => {
            foodFactory.create(Vec(
                Math.random() * 2 - 1,
                Math.random() * 2 - 1
            ));
        }

        const createXRandomFood = (x) => {
            Array.from(Array(x)).forEach(() => {
                createRandomFood();
            });
        }

        createXRandomFood(100);

        new WretchFactory(EntityManagerService).create(Vec(1, 0));

        this.systems = [
            new AnimateDilspriteSystem(EntityManagerService),
            new KinematicUpdateSystem(EntityManagerService),
            new MoveDilspriteToKinematicSystem(EntityManagerService),
            new ArriveSystem(EntityManagerService),
            new TaskSystem(EntityManagerService),
            new PathFindSystem(EntityManagerService),
            new PathFollowSystem(EntityManagerService),
            new QuerySystem(EntityManagerService)
        ];

        this.props.updateFunctions.push(this.onTick);
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