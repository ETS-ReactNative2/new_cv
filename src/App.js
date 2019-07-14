import React from "react";
import Helmet from "react-helmet";
import styled, { keyframes } from "styled-components";
import "./App.css";
import Panels from "./components/panel/Panels";
import Dimmer from "./components/dimmer/Dimmer";
import SidenoteBtn from "./components/sidenotes/SidenoteBtn";
import devices from "./utils/devices";

const shooting = keyframes`
  0% { transform: translateX(0) rotate(45deg); }
  100% { transform: translate(${window.screen.width * 2}px, ${window.screen
  .width * 2}px); }
`;

const tail = keyframes`
  0% { width: 0; }
  30% { width: 100px; }
  100% { width: 0; }
`;
const shining = keyframes`
  0% { width: 0; }
  50% { width: 20px; }
  100% { width: 0; }
`;

const rise = keyframes`
  to { top: -1000px; }
`;

const StarStyle = styled.div`
  position: absolute;
  top: ${props => props.y}px;
  left: ${props => props.x}px;
  height: 2px;
  background-image: linear-gradient(-45deg, #5f91ff, rgba(0, 0, 255, 0));
  filter: drop-shadow(0 0 8px #d6d6d6);
  animation: ${tail} ${props => props.duration}ms ${props => props.delay}ms
      ease-in-out infinite,
    ${shooting} ${props => props.duration}ms ${props => props.delay}ms
      ease-in-out infinite;

  &:before,
  &:after {
    position: absolute;
    content: "";
    top: calc(50% - 1px);
    right: 0;
    height: 2px;
    border-radius: 100%;
    background-image: linear-gradient(
      -45deg,
      rgba(0, 0, 255, 0),
      #5f91ff,
      rgba(0, 0, 255, 0)
    );
    transform: translateX(50%) rotateZ(45deg);
    animation: ${shining} ${props => props.duration}ms ${props => props.delay}ms
      ease-in-out infinite;
  }

  &:after {
    transform: translateX(50%) rotateZ(-45deg);
  }
`;

// const DropStyle = styled.span`
//   animation: ${rise} ${Math.floor(Math.random() * 5000) + 4000}ms ease-in-out
//     infinite;
//   left: ${props => props.x}px;
//   top: ${props => props.y}px;
//   position: absolute;
//   width: 1px;
//   height: 50px;
//   // background-image: linear-gradient(top, #C9D6FF, #E2E2E2);
//   background-color: rgba(226, 226, 226, 0.15);
// `;

const AppStyle = styled.div`
  background-image: linear-gradient(-45deg, #00103a 0%, #3e5f77 100%);
  /* url(stars_bg.gif); */
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
`;

// const Drops = () => {
//   const nbDrop = 1000

//   const [drops, setDrop] = React.useState([])

//   const randRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

//   React.useEffect(() => {
//     for (let i = 0; i < nbDrop; i++)
//       setTimeout(() => setDrop(prevDrops => [...prevDrops, <DropStyle x={randRange(0, window.screen.width)} y={randRange(window.screen.height, window.screen.height + 2500)} />]), i * 50)
//   }, [])

//   return drops
// }

const Star = ({ index }) => {
  const DURATION = 5000;
  const x = Math.random() * window.screen.width;
  const y = (Math.random() * window.screen.height) / 2;

  return <StarStyle x={x} y={y} duration={DURATION} delay={200 * index} />;
};

const App = () => {
  const NB_STARS = 100;
  const stars = Array.from({ length: NB_STARS });

  return (
    <React.Fragment>
      <Helmet
        title="My Interactive Resume"
        meta={[
          {
            name: "description",
            content: "A brand new resume made with React"
          },
          {
            name: "keywords",
            content:
              "school, gime, it, web, mobile, react, html, css, code, coding, javascript, skill, redux, responsive"
          }
        ]}
        link={[
          {
            rel: "stylesheet",
            href:
              "https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
          }
        ]}
      />
      <AppStyle>
        <Panels />
        <Dimmer />
        <SidenoteBtn />
      </AppStyle>
      {stars.length > 0 && stars.map((star, i) => <Star key={i} index={i} />)}
    </React.Fragment>
  );
};

export default App;
