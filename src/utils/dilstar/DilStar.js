import AStar from './astar';
import { Vector2 } from 'three';

export default class DilStar {

    static graphShape = 17;

    static findPath = (graphWeights = [[]], graphStart = new Vector2(), graphEnd = new Vector2()) => {
        // var graphDiagonal = new AStar.Graph(
        //     [
        //         [0, 1, 1, 0],
        //         [1, 1, 1, 1],
        //         [0, 0, 1, 1]
        //     ],
        //     { diagonal: true }
        // );
        // const start = graphDiagonal.grid[0][0];
        // const end = graphDiagonal.grid[1][2];
        const graphDiagonal = new AStar.Graph(
            graphWeights,
            { diagonal: true }
        );
        const start = graphDiagonal.grid[graphStart.x][graphStart.y];
        const end = graphDiagonal.grid[graphEnd.x][graphEnd.y];
        const resultWithDiagonals = AStar.astar.search(
            graphDiagonal,
            start,
            end,
            {
                heuristic: AStar.astar.heuristics.diagonal,
                closest: true
            }
        );
        return resultWithDiagonals;
    }

    static unitDirectionToGridLocation = (unitDirection = new Vector2(), gridShape = 5) => {
        // Step 1.1: Normalize direction to grid direction
        // UnitValues range from -1 to 1 = (UnitY + 1) / 2
        // -1 -.75 -.5 -.25 0 0.25 0.5 0.75 -1
        //                                  -.75
        //                                  -.5
        //                 ^                -.25
        //           <           >          0
        //                 v                0.25
        //                                  0.5
        //                                  0.75
        //                                  1
        const normedUnit = {
            x: (unitDirection.x + 1) / 2,
            y: (unitDirection.y + 1) / 2
        }
        // NormedUnit
        // 0 0.25 0.5 0.75 0
        //                 0.25
        //                 0.5
        //                 0.75
        //                 1

        // Inverted X
        // 1 0.75 0.5 0.25 1
        //                 0.75
        //                 0.5
        //                 0.25
        //                 0
        const gridX = Math.round((1 - normedUnit.x) * gridShape);
        const gridY = Math.round((1 - normedUnit.y) * gridShape);
        return new Vector2(
            gridX > 0 ? gridX - 1 : gridX,
            gridY > 0 ? gridY - 1 : gridY
        )
    };
}