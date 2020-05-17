import { v1 as uuidv1 } from 'uuid';

export default class Entity {
    constructor() {
        this.id = `entity-${uuidv1()}`
    }
}