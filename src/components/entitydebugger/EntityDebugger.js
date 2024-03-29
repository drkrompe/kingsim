import React from 'react';
import './EntityDebugger.scss';


export default class EntityDebugger extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            entityManager: window.debug.entityManager
        }
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            this.setState({
                hello: !this.state.hello
            });
        }, 100);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    vector2ToString = (vector2) => {
        return (
            <div>
                [{vector2.x.toFixed(2)},{vector2.y.toFixed(2)}]
            </div>
        )
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
                if (component.path !== null) {
                    ret.push(
                        <>
                            [
                            {component.path.map(pt => {
                                return (
                                    <div>{pt.x.toFixed(2)},{pt.y.toFixed(2)}</div>
                                );
                            })}
                            ]
                        </>
                    )
                }
            } else if (type === "path-find") {
                ret.push(component.from)
                ret.push(component.to)
            } else if (type === "arrive-target") {
                ret.push(
                    <div className='arrive-target'>
                        {component.targetId}
                    </div>
                )
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
                    Component: {subMapArray[0]}
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