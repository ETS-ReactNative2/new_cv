import React from 'react';
import Helmet from 'react-helmet'
import styled, { keyframes } from 'styled-components'
import './App.css';
import Panels from './components/panel/Panels';
import Dimmer from './components/dimmer/Dimmer';
import { PanelProvider } from './context/panelContext'
import panelReducer from './reducer/panelReducer'
import devices from './utils/devices';

const rise = keyframes`
  to { top: -1000px; }
`

const DropStyle = styled.span`
  animation: ${rise} ${Math.floor(Math.random() * 5000) + 4000}ms ease-in-out infinite;
  left: ${props => props.x}px;
  top: ${props => props.y}px;
  position: absolute;
  width: 1px;
  height: 50px;
  // background-image: linear-gradient(top, #C9D6FF, #E2E2E2);
  background-color: rgba(226, 226, 226, .15);
`

const AppStyle = styled.div`
  background-image: linear-gradient(45deg, rgba(15, 32, 39, 0.7), rgba(32, 58, 67, 0.7), rgba(44, 83, 100, 0.7)), url(stars_bg.gif);
  width: 100%;
  height: 100%;
  overflow: hidden;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: center;

  @media ${devices.laptop} {
    font-size: 1em;
  }

  @media ${devices.desktop} {
    font-size: 2em;
  }
`

const Drops = () => {
  const nbDrop = 1000

  const [drops, setDrop] = React.useState([])

  const randRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

  React.useEffect(() => {
    for (let i = 0; i < nbDrop; i++)
      setTimeout(() => setDrop(prevDrops => [...prevDrops, <DropStyle x={randRange(0, window.screen.width)} y={randRange(window.screen.height, window.screen.height + 2500)} />]), i * 50)
  }, [])

  return drops
}

const App = () => {

  return (
    <React.Fragment>
      <Helmet
        title="My Interactive Resume"
        meta={[
          { name: 'description', content: 'A brand new resume made with React' },
          { name: 'keywords', content: 'school, gime, it, web, mobile, react, html, css, code, coding, javascript, skill, redux, responsive' },
        ]}
        link={[
          { 'rel': 'stylesheet', 'href': 'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css' }
        ]}
      />
      <PanelProvider reducer={panelReducer}>
        <AppStyle>
          <Panels />
          <Dimmer />
        </AppStyle>
      </PanelProvider>
      {/* <Drops /> */}
    </React.Fragment>
  );
}

export default App;
