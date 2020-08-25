import React from 'react';
import appCSS from './App.module.scss';
import Canvas from './Canvas/Canvas';
import DefaultCanvas from './DefaultCanvas/DefaultCanvas';
import ImageDataContextProvider from './contexts/ImageDataContext';

const App = () => {
  return (
    <div className={appCSS.mainWindow}>
      <ImageDataContextProvider>
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
      </ImageDataContextProvider>
    </div>
  );
} //end of App func comp

export default App;