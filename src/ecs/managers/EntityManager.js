import Component from "../components/Component"

export default class EntityManager {

    constructor() {
        this.typeToComponents = new Map()
    }

    getComponents(type = "") {
        return this.typeToComponents.get(type)
    }

    getComponent(type = "", eid = "") {
        const compMap = this.typeToComponents.get(type);
        if (compMap !== null) {
            return compMap.get(eid);
        }
    }

    addComponent(component = new Component()) {
        let componentGroupMap = this.typeToComponents.get(component.type);
        if (componentGroupMap === undefined) {
            componentGroupMap = new Map();
            this.typeToComponents.set(component.type, componentGroupMap);
        }
        componentGroupMap.set(component.id, component);
    }

    removeComponent(component = new Component()) {
        const subComponentMap = this.typeToComponents.get(component.type);
        subComponentMap.delete(component.id);
    }

    removeEntityComponent(type = "", eid = "") {
        const compMap = this.typeToComponents.get(type);
        if (compMap !== null) {
            compMap.delete(eid);
        }
    }

    removeAllEntityComponents(eid = "") {
        this.typeToComponents.forEach(compMap => {
            compMap.delete(eid);
        });
    }
}