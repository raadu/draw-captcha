import React from 'react';
import appCSS from './App.module.scss';
import Canvas from './Canvas/Canvas';

const App = () => {
  return (
    <div className={appCSS.mainWindow}>
      <div className={appCSS.container}>
      <div 
        className={appCSS.imageContainer} 
        style={{backgroundImage: "url(./sample/starRed.png)"}}>
      </div>
      <Canvas 
        width={600} 
        height={600}
      />
      </div>
    </div>
  );
} //end of App func comp

export default App;