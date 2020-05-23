import React from 'react';
import * as THREE from 'three';
import RendererService from './services/RendererService';
import CameraService from './services/CameraService';
import SceneService from './services/SceneService';
import DemoWretch from './components/demo-wretch/DemoWretch';
import EntityManagerService from './services/EntityManagerService';

function App() {

  window.services = {
    entityManager: EntityManagerService
  }

  SceneService.scene.background = new THREE.Color(0x68a357);

  return (
    <div className="App">
      <DemoWretch
        renderer={RendererService.renderer}
        camera={CameraService.camera}
        scene={SceneService.scene}
        updateFunction={null}
        updateFunctions={[]}
      />
    </div>
  );
}

export default App;
