import React from 'react';
import "./SimpleControls.scss";
import GridOverlay from '../../kingsim/overlays/GridOverlay';

export default class SimpleControls extends React.Component {

    handleClick = (event) => {
        GridOverlay.toggleGrid();
    }

    render() {
        return (
            <div className='controls'>
                <button onClick={this.handleClick}>
                    Toggle Grid
                </button>
            </div>
        );
    }

}