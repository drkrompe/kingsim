import React from 'react';
import "./SimpleControls.scss";
import GridOverlay from '../../kingsim/overlays/GridOverlay';

export default class SimpleControls extends React.Component {

    handleClick = (event) => {
        switch (event.target.id) {
            case 'tgl-grid':
                GridOverlay.toggleGrid();
                break;
            case 'full-screen':
                document.getElementById('canvas').requestFullscreen();
                break;
            case 'bld-wall':
                break;
            default:
        }
    }

    render() {
        return (
            <div className='controls'>
                <button id='tgl-grid' className='btn' onClick={this.handleClick}>
                    Toggle Grid
                </button>
                <button id="bld-wall" className='btn' onClick={this.handleClick}>
                    Build Wall
                </button>
                <button id="full-screen" className='btn' onClick={this.handleClick}>
                    FullScreen
                </button>
            </div>
        );
    }

}