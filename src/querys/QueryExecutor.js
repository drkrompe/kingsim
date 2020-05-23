import { Vector2 } from "three";
import EntityManager from "../ecs/managers/EntityManager";

class QueryExecutorClass {
    static QueryExecutor(query = new Query(), entityManager = new EntityManager()) {
        let comps = Array.from(entityManager.getComponents(query.compType).values());
        if (query.compTypePredicate !== null) {
            comps = comps.filter(query.compTypePredicate);
        }
        if (query.locality === null) {
            return comps.shift();
        }

        switch (query.locality) {
            case QueryLocality.NEAREST:
                return QueryExecutorClass._nearestCompTo(query.location, comps, entityManager);
            case QueryLocality.FARTHEST:
                return QueryExecutorClass._farthestCompTo(query.location, comps, entityManager);
            default:
                return null;
        }
    }

    static _nearestCompTo(location = new Vector2(), comps = [], entityManager = new EntityManager()) {
        const nearestResult = {
            found: 0,
            distance: null,
            comp: null,
            kinematic: null
        }
        // O(n) n=#comps
        comps.forEach(comp => {
            const kinematicComp = entityManager.getComponent('kinematic', comp.id);
            const distance = kinematicComp.position.distanceTo(location);
            if (nearestResult.distance === null) {
                nearestResult.found = 1;
                nearestResult.distance = distance;
                nearestResult.comp = comp;
                nearestResult.kinematic = kinematicComp;
            } else if (nearestResult.distance > distance) {
                nearestResult.distance = distance;
                nearestResult.comp = comp;
                nearestResult.kinematic = kinematicComp;
            }
        });

        return nearestResult;
    }

    static _farthestCompTo(location = new Vector2(), comps = [], entityManager = new EntityManager()) {
        const farthestResult = {
            found: 0,
            distance: null,
            comp: null,
            kinematic: null
        }
        // O(n) n=#comps
        comps.forEach(comp => {
            const kinematicComp = entityManager.getComponent('kinematic', comp.id);
            const distance = kinematicComp.position.distanceTo(location);
            if (farthestResult.distance === null) {
                farthestResult.found = 1;
                farthestResult.distance = distance;
                farthestResult.comp = comp;
                farthestResult.kinematic = kinematicComp;
            } else if (farthestResult.distance < distance) {
                farthestResult.distance = distance;
                farthestResult.comp = comp;
                farthestResult.kinematic = kinematicComp;
            }
        });

        return farthestResult;
    }
}

export class Query {
    //"FIND one TYPE food LOCALITY nearest LOCATION (1,1)"
    //"FIND one TYPE food LOCALITY farthest LOCATION (1,1)"
    //"FIND one TYPE food LOCALITY null LOCATION null"
    constructor(
        // find = null,
        compType = null,
        compTypePredicate = null,
        locality = null,
        location = null
    ) {
        // this.find = find;
        this.compType = compType;
        this.compTypePredicate = compTypePredicate;
        this.locality = locality;
        this.location = location;
    }
}

export const QueryLocality = {
    NEAREST: 'nearest',
    FARTHEST: 'fathest'
}

export default QueryExecutorClass.QueryExecutor;