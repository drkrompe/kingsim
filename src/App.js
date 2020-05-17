import React from 'react';
import * as THREE from 'three';
import BaseRenderer from './components/baserenderer/BaseRenderer';
import RendererService from './services/RendererService';
import CameraService from './services/CameraService';
import SceneService from './services/SceneService';
import DemoWretch from './components/demo-wretch/DemoWretch';

function App() {

  SceneService.scene.background = new THREE.Color(0x68a357)

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
