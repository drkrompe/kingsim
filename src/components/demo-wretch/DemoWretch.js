import React from 'react';
import * as THREE from 'three';
import BaseRenderer from '../baserenderer/BaseRenderer';
import WretchFactory from '../../kingsim/entities/WretchFactory';
import EntityManagerSystem from '../../services/EntityManagerService';
import AnimateDilspriteSystem from '../../kingsim/systems/AnimateDilspriteSystem';
import FoodFactory from '../../kingsim/entities/FoodFactory';
import EntityManagerService from '../../services/EntityManagerService';
import Vec from '../../utils/Vec';
import MoveDilspriteToKinematicSystem from '../../kingsim/systems/MoveDilspriteToKinematicSystem';
import KinematicUpdateSystem from '../../kingsim/systems/kinematicupdate/KinematicUpdateSystem';
import ArriveSystem from '../../kingsim/systems/steering/ArriveSystem';

export default class DemoWretch extends React.Component {

    componentDidMount() {
        this.clock = new THREE.Clock();
        const foodEntity = new FoodFactory(EntityManagerService).create(Vec(-1, 0));
        new WretchFactory(EntityManagerSystem).create(Vec(1, 0), foodEntity.id);
        
        this.systems = [
            new AnimateDilspriteSystem(EntityManagerSystem),
            new KinematicUpdateSystem(EntityManagerService),
            new MoveDilspriteToKinematicSystem(EntityManagerService),
            new ArriveSystem(EntityManagerService)
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
                <BaseRenderer {...this.props}/>
            </>
        )
    }
}