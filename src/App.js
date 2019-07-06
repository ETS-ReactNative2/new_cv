import React from 'react';
import './App.css';
import Panels from './components/panel/Panels';
import Dimmer from './components/dimmer/Dimmer';
import { PanelProvider } from './context/panelContext'
import panelReducer from './reducer/panelReducer';

const App = () => {
  return (
    <PanelProvider reducer={panelReducer}>
      <Panels />
      <Dimmer />
    </PanelProvider>
  );
}

export default App;
