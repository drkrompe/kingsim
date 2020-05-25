import * as THREE from 'three';
import CameraService from '../../services/CameraService';
import { Vector3, Vector2 } from 'three';
import SceneService from '../../services/SceneService';

class GridOverlay {

    static _lines = [];
    static worldUnitToGridUnit = 0.1;
    static unitInView = new Vector2(4, 2);
    static printGrid = false;

    static worldPositionToGridPosition = (worldPosition) => {
        const gridX = Math.floor(worldPosition.x / this.worldUnitToGridUnit);
        const gridY = Math.floor(worldPosition.y / this.worldUnitToGridUnit);
        return new Vector2(gridX, gridY);
    }

    static gridPositionToWorldPosition = (gridPosition = new Vector2()) => {
        const worldX = gridPosition.x * this.worldUnitToGridUnit + (0.5 * this.worldUnitToGridUnit);
        const worldY = gridPosition.y * this.worldUnitToGridUnit + (0.5 * this.worldUnitToGridUnit);
        return new Vector2(worldX, worldY);
    }

    static toggleGrid() {
        if (GridOverlay._lines.length === 0) {
            GridOverlay._addGridLines();
            this.printGrid = true;
        } else {
            const clearOutNum = GridOverlay._lines.length;
            for (let i = 0; i < clearOutNum; i++) {
                const line = GridOverlay._lines.shift();
                SceneService.scene.remove(line);
            }
            this.printGrid = false;
        }
    }

    static _position = () => {
        return CameraService.camera.position;
    }

    static _addGridLines = () => {
        const relativePosition = GridOverlay._position();

        const numberVerticleLines = (this.unitInView.x / this.worldUnitToGridUnit) + 1;
        const numberHorizontalLines = (this.unitInView.y / this.worldUnitToGridUnit) + 1;
        // Create vertical lines
        for (let i = 0; i < numberVerticleLines; i++) {
            const x = relativePosition.x - (this.unitInView.x / 2) + (i * this.worldUnitToGridUnit);
            const y1 = relativePosition.x - (this.unitInView.y / 2)
            const y2 = relativePosition.x - (-this.unitInView.y / 2)
            const line = this._createLine(
                new Vector3(x, y1, 0.1),
                new Vector3(x, y2, 0.1),
                0.1
            );
            GridOverlay._lines.push(line);
            SceneService.scene.add(line);
        }
        // Create horizontal lines
        for (let i = 0; i < numberHorizontalLines; i++) {
            const y = relativePosition.y - (this.unitInView.y / 2) + (i * this.worldUnitToGridUnit);
            const x1 = relativePosition.x - (this.unitInView.x / 2);
            const x2 = relativePosition.x - (-this.unitInView.x / 2);
            const line = this._createLine(
                new Vector3(x1, y, 0.1),
                new Vector3(x2, y, 0.1),
                0.1
            );
            GridOverlay._lines.push(line);
            SceneService.scene.add(line);
        }
    }

    static _createLine = (from, to) => {
        const points = [
            from,
            to
        ];
        const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
        const lineMaterial = new THREE.LineBasicMaterial({
            color: 0xffff00
        });
        const line = new THREE.Line(
            lineGeometry,
            lineMaterial
        );
        return line;
    }

}

export default GridOverlay;