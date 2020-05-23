import Component from "../components/Component";

export default class EntityManager {

    constructor() {
        this.typeToComponents = new Map()
    }

    getComponents(type = "") {
        return this.typeToComponents.get(type)
    }

    getComponent(type = "", eid = "") {
        const compMap = this.typeToComponents.get(type);
        if (compMap !== undefined) {
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
        component.onDelete();
        subComponentMap.delete(component.id);
    }

    removeEntityComponent(type = "", eid = "") {
        const comp = this.getComponent(type, eid)
        if (comp !== undefined) {
            this.removeComponent(comp);
        }
    }

    removeAllEntityComponents(eid = "") {
        this.typeToComponents.forEach(compMap => {
            const comp = compMap.get(eid);
            if (comp !== undefined) {
                this.removeComponent(comp);
            }
        });
    }
}