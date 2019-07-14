import React, { useRef, useState } from "react";
import styled from "styled-components";
import Quote from "../skills/Quote";
import CircularGauge from "../skills/CircularGauge";
import DimmerCloseBtn from "./DimmerCloseBtn";
import Tooltip from "../tooltip/Tooltip";
import { SET_NAME, MINIMIZE } from "../../reducer/panelReducer";
import { usePanelValues } from "../../context/panelContext";
import devices from "../../utils/devices";

const ItemContentShadow = styled.div`
  opacity: ${props => (props.expand && props.name === "modal" ? 1 : 0)};
  width: ${props =>
    props.expand && props.name === "modal" ? "80%" : props.width + "px"};
  height: ${props =>
    props.expand && props.name === "modal" ? "80%" : props.height + "px"};
  left: ${props =>
    props.expand && props.name === "modal" ? "50%" : props.left + "px"};
  top: ${props =>
    props.expand && props.name === "modal" ? "50%" : props.top + "px"};
  transform: translate(-50%, -50%);
  border-radius: 5px;
  background-color: ${props =>
    props.expand && props.name === "modal" ? "#29323c" : "white"};
  position: absolute;
  transition: width ${props => props.expandDuration}ms ease-in,
    height ${props => props.expandDuration}ms ease-in,
    left ${props => props.expandDuration}ms ease-in,
    top ${props => props.expandDuration}ms ease-in,
    background-color ${props => props.expandDuration}ms ease-in,
    opacity ${props => props.expandDuration}ms ease-in;

  & > div {
    overflow-y: auto;
    padding: 5px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;

    & .no-landscape {
      visibility: hidden;
    }
  }

  @media ${devices.desktop} {
    & > div {
      padding-top: 50px;
    }
  }

  @media ${devices.mobileL} {
    width: ${props =>
      props.expand && props.name === "modal" ? "98%" : props.width + "px"};
    height: ${props =>
      props.expand && props.name === "modal" ? "98%" : props.height + "px"};

    & > div {
      @media (orientation: landscape) {
        & .no-landscape {
          visibility: visible;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }
    }
  }

  @media ${devices.mobileM} {
    & > div {
      padding: 0;
    }
  }
`;

const DimmerContent = () => {
  const itemContentShadowRef = useRef();

  const [isQuoteDisplayed, setQuoteDisplay] = useState(false);

  const [
    {
      item,
      panelWidth,
      panelHeight,
      panelX,
      panelY,
      expand,
      expandDuration,
      componentName
    },
    dispatch
  ] = usePanelValues();

  const displayQuote = (name, index) => {
    setQuoteDisplay(name ? true : false);
    dispatch({ type: SET_NAME, payload: name });
  };

  const handleClose = () => {
    setQuoteDisplay(false);
    dispatch({ type: MINIMIZE });
  };

  return (
    <ItemContentShadow
      ref={itemContentShadowRef}
      width={panelWidth}
      height={panelHeight}
      left={panelX !== 0 && panelX}
      top={panelY !== 0 && panelY}
      expandDuration={expandDuration}
      expand={expand}
      name={componentName}
    >
      <div>
        <Tooltip>
          Click on a circular and read my thougth about this technology
        </Tooltip>
        <DimmerCloseBtn handleClick={handleClose} />
        {item &&
          item.skills.map((skill, i) => (
            <CircularGauge
              key={i}
              index={i}
              expand={expand}
              displayQuote={displayQuote}
              skill={skill}
              radius={40}
              cx={50}
              cy={50}
            />
          ))}
        {item && <Quote display={isQuoteDisplayed} skills={item.skills} />}
        <span className="no-landscape">
          Modal is not displayed in landscape oriantation for mobile
        </span>
      </div>
    </ItemContentShadow>
  );
};

export default DimmerContent;
