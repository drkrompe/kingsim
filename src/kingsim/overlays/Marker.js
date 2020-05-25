import * as THREE from 'three';
import SceneService from '../../services/SceneService';

export default class Marker {
    static createAt = (worldPosition, color = 0xffff00, ttl = 1000) => {
        const geometry = new THREE.CircleGeometry(1, 10);
        const material = new THREE.MeshBasicMaterial({ color: color })
        const obj = new THREE.Mesh(geometry, material);
        obj.position.x = worldPosition.x;
        obj.position.y = worldPosition.y;
        obj.scale.x = 0.03;
        obj.scale.y = 0.03;
        SceneService.scene.add(obj);
        setTimeout(() => {
            SceneService.scene.remove(obj);
        }, ttl);
    }
}