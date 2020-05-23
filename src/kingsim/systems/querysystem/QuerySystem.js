import System from "../../../ecs/systems/System";
import QueryExecutor from "../../../querys/QueryExecutor";

export default class QuerySystem extends System {

    // Component Data Used
    // - ItemQueryComponent
    //   - itemQuery null | ItemQuery object

    systemTick(timeDelta) {
        const queryComps = this._entityManager.getComponents('query');
        queryComps.forEach(queryComp => {
            if (queryComp.queryRequest) {
                queryComp.queryResult = QueryExecutor(queryComp.queryRequest, this._entityManager);
                queryComp.queryRequest = null;
            }
        });
    }
}