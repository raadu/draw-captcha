import React, {useState} from 'react';
import appCSS from './App.module.scss';
import Canvas from './Canvas/Canvas';
import DefaultCanvas from './DefaultCanvas/DefaultCanvas';
// import ImageDataContextProvider from './contexts/ImageDataContext';

const App = () => {
  //States
  const [defaultImageData, setDefaultImageData] = useState({});

  // console.log("set default img data in app", defaultImageData);

  return (
    <div className={appCSS.mainWindow}>
        <div className={appCSS.canvasContainer}>
          <div className={appCSS.canvas1}>
            <DefaultCanvas
              width={600}
              height={600}
              setDefaultImageData={setDefaultImageData}
            />
          </div>
          <div className={appCSS.canvas2}>
            <Canvas
              width={600} 
              height={600}
              defaultImageData={defaultImageData}
            />
          </div>
        </div>
    </div>
  );
} //end of App func comp

export default App;