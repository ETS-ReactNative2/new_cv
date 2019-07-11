import React from "react";
import styled from "styled-components";
import { usePanelValues } from "../../context/panelContext";
import Tooltip from "../tooltip/Tooltip";
import Sidenotes from "./Sidenotes";

const ContentStyle = styled.div`
  opacity: ${props => (props.expand && props.name === "sidenote" ? 1 : 0)};
  width: ${props =>
    props.expand && props.name === "sidenote" ? "90%" : "0px"};
  height: ${props =>
    props.expand && props.name === "sidenote" ? "80%" : "0px"};
  top: ${props => (props.expand && props.name === "sidenote" ? 50 : 100)}%;
  left: 50%;
  transform: translate(
    -50%,
    ${props => (props.expand && props.name === "sidenote" ? -50 : 0)}%
  );
  position: absolute;
  transition: width ${props => props.expandDuration}ms ease-in,
    height ${props => props.expandDuration}ms ease-in,
    top ${props => props.expandDuration}ms ease-in,
    opacity ${props => props.expandDuration}ms ease-in,
    transform ${props => props.expandDuration}ms ease-in;

  & > div {
    width: 100%;
    height: 100%;
  }
`;

const SidenoteContent = () => {
  const [{ expand, expandDuration, componentName }, _] = usePanelValues();

  return (
    <ContentStyle
      expand={expand}
      expandDuration={expandDuration}
      name={componentName}
    >
      <div>
        <Tooltip>
          Here I note some bugs I notice during project's development
        </Tooltip>
        <Sidenotes />
      </div>
    </ContentStyle>
  );
};

export default SidenoteContent;
