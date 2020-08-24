import React from 'react';
import appCSS from './App.module.scss';
import Canvas from './Canvas/Canvas';
import DefaultCanvas from './DefaultCanvas/DefaultCanvas';

const App = () => {
  return (
    <div className={appCSS.mainWindow}>
      <div className={appCSS.canvasContainer}>
        <div className={appCSS.canvas1}>
          <DefaultCanvas
            width={600}
            height={600}
          />
        </div>
        <div className={appCSS.canvas2}>
          <Canvas
            width={600} 
            height={600}
          />
        </div>
      </div>
    </div>
  );
} //end of App func comp

export default App;