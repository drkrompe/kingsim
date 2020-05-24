import React from 'react';
import './EntityDebugger.scss';


export default class EntityDebugger extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            entityManager: window.services.entityManager
        }
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            this.setState({
                hello: !this.state.hello
            });
        }, 500);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }
    


    render() {
        const thing = Array.from(this.state.entityManager.typeToComponents.entries());
        // console.log(thing);
        return (
            <div className="entity-debugger">
                {thing.map(subArray => <span>{subArray[0]} - {subArray[1].size}</span>)}  
            </div>
        );
    }
}