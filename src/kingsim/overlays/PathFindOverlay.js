import Marker from "./Marker"
import { Vector2 } from "three"
import GridOverlay from "./GridOverlay"
import DilStar from "../../utils/dilstar/DilStar"

export default class PathFindOverlay {
    static create = (weightGraph, graphFrom, graphTo, conversionVector) => {
        for (let i = 0; i < weightGraph.length; i++){
            for (let j = 0; j < DilStar.graphShape; j++){
                const gridCoordinate = new Vector2(i,j).sub(conversionVector)
                const worldCoordinate = GridOverlay.gridPositionToWorldPosition(gridCoordinate);
                const value = weightGraph[i][j];
                Marker.createAt(worldCoordinate, value === 1 ? 0xffffff : 0xff0000, 3000);
            }
        }
    }
}