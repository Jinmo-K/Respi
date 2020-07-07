import React, { useEffect } from 'react';

import Indicator from './components/Indicator';
import Settings from './components/Settings';

import './stylesheets/main.scss';

function App() {

  /**
   * check for settings
   */
  useEffect(() => {

  }, []);

  return (
    <div className="App">
      <Indicator />
      <Settings />
    </div>
  );
}

export default App;
