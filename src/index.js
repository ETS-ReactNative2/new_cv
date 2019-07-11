import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { PanelProvider } from './context/panelContext';
import panelReducer from './reducer/panelReducer'

ReactDOM.render(
  <PanelProvider reducer={panelReducer}>
    <App />
  </PanelProvider>,
  document.getElementById('root')
);
