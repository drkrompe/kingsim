import System from "../../../ecs/systems/System";
import { Vector2 } from "three";
import DilStar from "../../../utils/dilstar/DilStar";
import GridOverlay from "../../overlays/GridOverlay";
import PathFindOverlay from "../../overlays/PathFindOverlay";

export default class PathFindSystem extends System {

    static instantiateWeightGraph = () => {
        const array = Array(DilStar.shape);
        for (let i = 0; i < DilStar.graphShape; i++) {
            array[i] = Array(DilStar.shape).fill(1);
        }
        return array;
    }
    static weightGraph = PathFindSystem.instantiateWeightGraph();


    systemTick(timeDelta) {
        const pathFindComps = this._entityManager.getComponents('path-find');
        pathFindComps.forEach(pathFindComp => {
            if (pathFindComp.to !== null) {
                const path = this._pathFind(pathFindComp.from, pathFindComp.to);
                const pathComp = this._entityManager.getComponent('path', pathFindComp.id);
                pathComp.path = path;
                pathFindComp.to = null;
                pathFindComp.from = null;
            }
        });
    }

    _pathFind = (from = new Vector2(), to = new Vector2(), eid) => {
        const graphConstructionResult = this._constructWeightGraph(
            GridOverlay.worldPositionToGridPosition(from),
            GridOverlay.worldPositionToGridPosition(to)
        );
        const graphPath = DilStar.findPath(
            graphConstructionResult.weightGraph,
            graphConstructionResult.gridFrom,
            graphConstructionResult.gridTo
        );
        window.debug.pathFind && PathFindOverlay.create(
            graphConstructionResult.weightGraph,
            graphConstructionResult.gridFrom,
            graphConstructionResult.gridTo,
            graphConstructionResult.conversionVector
        )
        return graphPath.map(node => GridOverlay.gridPositionToWorldPosition(new Vector2(node.x, node.y).sub(graphConstructionResult.conversionVector)));
    }

    _constructWeightGraph = (from = new Vector2(), to = new Vector2()) => {
        // Step 1: get From point on WorldGraph to point on WeightGraph
        //      - get direction unit vector Unit(To - From)
        //      - Calc optimal position of from on weight graph to toward target.
        // Step 2: calc position of to(weightGraph)
        //      - Calc conversion f(worldGraph) = from(worldGraph) -> from(weightGraph)
        //      - Apply conversion to to(worldGraph) to get => to(weightGraph) = f(to(worldGraph))
        //      - if toOnGraph is outside of graphShape 
        //          - calc closest and set as toOnGraph
        // Step 3: fill reset of weight graph with obstacles
        // - Two choices...
        //   - 1. Sample graph locations to see if they are in "use" / traverable
        //   - 2. Query each entity with a grid position on the graph

        // Step1
        const directionVector = to.clone().sub(from).normalize();
        const fromOnGraph = DilStar.unitDirectionToGridLocation(directionVector, DilStar.graphShape);
        // Step2
        const conversionVector = fromOnGraph.clone().sub(from); // fromgraph - fromworld = Vec graph -> world (Works if units are 1:1)
        const toOnGraph = to.clone().add(conversionVector);
        if (toOnGraph.x < 0 || toOnGraph.x >= DilStar.graphShape || toOnGraph.y < 0 || toOnGraph.y >= DilStar.graphShape) {
            const toClosestOn = DilStar.unitDirectionToGridLocation(directionVector.clone().multiplyScalar(-1), DilStar.graphShape);
            toOnGraph.x = toClosestOn.x;
            toOnGraph.y = toClosestOn.y;
        }
        // Step3 fill PathFindSystem.weightGraph
        this._fillWeightGraph(conversionVector);

        // Step4 Make from and to positions traversable
        PathFindSystem.weightGraph[fromOnGraph.x][fromOnGraph.y] = 1;
        PathFindSystem.weightGraph[toOnGraph.x][toOnGraph.y] = 1;

        return {
            // x values are spread across sub arrays
            // y values are the sub arrays
            weightGraph: PathFindSystem.weightGraph,
            gridFrom: fromOnGraph,
            gridTo: toOnGraph,
            conversionVector: conversionVector,
        };
    }

    _fillWeightGraph = (conversionVector = new Vector2()) => {
        // Step 3: fill reset of weight graph with obstacles
        // - Two choices...
        //   - 1. Sample graph locations to see if they are in "use" / traverable
        //   - 2. Query each entity with a grid position on the graph
        for (let i = 0; i < DilStar.graphShape; i++) {
            for (let j = 0; j < DilStar.graphShape; j++){
                PathFindSystem.weightGraph[i][j] = 1;
            }
        }
        const gridPositionComps = this._entityManager.getComponents('grid-position');
        gridPositionComps.forEach(gridPositionComp => {
            const converted = gridPositionComp.gridPosition.clone().add(conversionVector);
            if (converted.x < 0 || converted.x >= DilStar.graphShape || converted.y < 0 || converted.y >= DilStar.graphShape) {
                // do nothing b/c not on graph
            } else {
                PathFindSystem.weightGraph[converted.x][converted.y] = 0;
            }
        });

    }
}