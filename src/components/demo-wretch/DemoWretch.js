import React from 'react';
import * as THREE from 'three';
import BaseRenderer from '../baserenderer/BaseRenderer';
import WretchFactory from '../../kingsim/entities/WretchFactory';
import EntityManagerSystem from '../../services/EntityManagerService';
import AnimateDilspriteSystem from '../../kingsim/systems/AnimateDilspriteSystem';
import FoodFactory from '../../kingsim/entities/FoodFactory';
import EntityManagerService from '../../services/EntityManagerService';
import Vec from '../../utils/Vec';
import MoveDilspriteToWorldLocationService from '../../kingsim/systems/MoveDilspriteToWorldLocationService';

export default class DemoWretch extends React.Component {

    componentDidMount() {
        this.clock = new THREE.Clock();
        new WretchFactory(EntityManagerSystem).create();
        new FoodFactory(EntityManagerService).create(Vec(-1, 0));
        this.systems = [
            new AnimateDilspriteSystem(EntityManagerSystem),
            new MoveDilspriteToWorldLocationService(EntityManagerService)
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