import React from 'react';
import "./App.scss";
import * as THREE from 'three';
import RendererService from './services/RendererService';
import CameraService from './services/CameraService';
import SceneService from './services/SceneService';
import DemoWretch from './components/demo-wretch/DemoWretch';
import EntityManagerService from './services/EntityManagerService';
import EntityDebugger from './components/entitydebugger/EntityDebugger';
import SimpleControls from './components/simpleControls/SimpleControls';

function App() {

  window.debug = {
    entityManager: EntityManagerService,
    pathFind: false,
  }

  SceneService.scene.background = new THREE.Color(0x68a357);

  return (
    <div className="App">
      <EntityDebugger />
      <div className="canvas-and-controls">
        <DemoWretch
          renderer={RendererService.renderer}
          camera={CameraService.camera}
          scene={SceneService.scene}
          updateFunction={null}
          updateFunctions={[]}
        />
        <SimpleControls />
      </div>
    </div>
  );
}

export default App;
