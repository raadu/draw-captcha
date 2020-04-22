import React from 'react';
import appCSS from './App.module.scss';
import Canvas from './Canvas/Canvas';

const App = () => {
  return (
    <div className={appCSS.mainWindow}>
      <Canvas width={600} height={600}/>
    </div>
  );
} //end of App func comp

export default App;