import Component from "../../ecs/components/Component";

export default class QueryComponent extends Component {
    constructor(entity, queryRequest = null) {
        super(entity.id, "find-item");
        this.queryRequest = queryRequest; // null or some kind of query? 
        this.queryResult = null; // null = not searched | undefined = not found? | {location, id}?
        // Maybe have fuzzy searches like { type: "food" }
        // or go indepth and do specific searches like {type: "apple"}
    }
}