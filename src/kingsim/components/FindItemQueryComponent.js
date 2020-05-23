import Component from "../../ecs/components/Component";

export default class FindItemQueryComponent extends Component {
    constructor(entity, itemQuery = null) {
        super(entity.id, "find-item");
        this.itemQuery = itemQuery; // null or some kind of query? 
        // Maybe have fuzzy searches like { type: "food" }
        // or go indepth and do specific searches like {type: "apple"}
        this.queryResult = null; // null = not searched | undefined = not found? | {location, id}?
    }
}