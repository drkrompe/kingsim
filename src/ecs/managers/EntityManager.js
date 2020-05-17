import Component from "../components/Component"

export default class EntityManager {
    
    constructor() {
        this.typeToComponents = new Map()
    }

    getComponents(type = "") {
        return this.typeToComponents.get(type)
    }

    addComponent(component = new Component()) {
        let componentGroup = this.typeToComponents.get(component.type);
        if (!componentGroup) {
            componentGroup = []
            this.typeToComponents.set(component.type, componentGroup);
        }
        componentGroup.push(component);
    }

    removeComponent(component = new Component()) {
        const list = this.typeToComponents.get(component.type);
        for (let i = 0; i < list.length; i++){
            if (list[i] === component) {
                list.splice(i, 1);
                break;
            }
        }
    }
}