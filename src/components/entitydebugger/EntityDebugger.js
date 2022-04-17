import React from 'react';
import './EntityDebugger.scss';


export default class EntityDebugger extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            entityManager: window.debug.entityManager
        }
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    vector2ToString = (vector2) => {
        return <div>[{vector2.x.toFixed(2)},{vector2.y.toFixed(2)}]</div>
    }

    renderComponentEntries = (type, componentMap) => {
        const ret = [];

        componentMap.forEach(component => {
            if (type === "task") {
                ret.push(
                    <div>
                        {component.task.constructor.name}
                    </div>
                )
            } else if (type === "kinematic") {
                ret.push(this.vector2ToString(component.position))
            } else if (type === "grid-position") {
                ret.push(this.vector2ToString(component.gridPosition))
            } else if (type === "path") {
                component.path !== null && ret.push(component.path.map(pt => this.vector2ToString(pt)))
            } else if (type === "path-find") {
                ret.push(component.from)
                ret.push(component.to)
            } else if (type === "arrive-target") {
                ret.push(component.targetId)
            } else if (type === "query") {
                component.queryResult && ret.push(component.queryResult.distance)
            } else if (type === "steering") {
                ret.push(this.vector2ToString(component.linear))
            }
        })

        return ret;
    }

    renderEntries = (entries) => {
        return entries.map(subMapArray => {
            return (
                <div className="entries">
                    {subMapArray[0]}
                    <div className="sub-entry">
                        {this.renderComponentEntries(subMapArray[0], subMapArray[1])}
                    </div>
                </div>
            );
        });
    }

    render() {
        const entries = Array.from(this.state.entityManager.typeToComponents.entries());
        return (
            <div className="entity-debugger">
                {this.renderEntries(entries)}
            </div>
        );
    }
}