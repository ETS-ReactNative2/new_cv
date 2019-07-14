import React from "react";
import styled from "styled-components";
import Badge from "./Badge";
import { usePanelValues } from "../../context/panelContext";
import {
  SET_NAME,
  SET_WIDTH,
  SET_HEIGHT,
  SET_X,
  SET_Y,
  SET_ITEM,
  SET_COMPONENT
} from "../../reducer/panelReducer";
import devices from "../../utils/devices";
import { arrowToLeft, arrowToRight } from "../../utils/arrowKeyframes";

const ItemContent = styled.div`
  padding: 5px;
  display: flex;
  flex-wrap: wrap;
  border-radius: 5px;
`;

const ItemTitle = styled.h3`
  text-align: center;
  margin-top: 5px;
  padding: 0px;
  cursor: pointer;
  text-shadow: 2px 3px 7px rgba(0, 0, 0, 0.3);
  transition: color 600ms ease, background-color 600ms ease;

  &:hover {
    color: white;
    background-color: #2c3e50;
  }

  & > span:nth-child(2) {
    padding: 0 35px;
  }

  & > .left-icon {
    font-size: 0.8em;

    & > i:nth-child(1) {
      animation: ${arrowToLeft} 1000ms ease-in infinite;
    }

    & > i:nth-child(2) {
      animation: ${arrowToLeft} 1000ms 100ms ease-in infinite;
    }
  }

  & > .right-icon {
    font-size: 0.8em;

    & > i:nth-child(1) {
      animation: ${arrowToRight} 1000ms ease-in infinite;
    }

    & > i:nth-child(2) {
      animation: ${arrowToRight} 1000ms 100ms ease-in infinite;
    }
  }
`;

const ItemStyle = styled.li`
  width: 100%;
  height: auto;
  padding: 0 5px;
  z-index: 1;
  border-bottom: 2px solid rgba(0, 0, 0, 0.2);
  &:last-child {
    border-bottom: none;
  }

  @media ${devices.mobileL} {
    font-size: 0.8em;
  }
`;

const Skill = ({ itemSelected, index }) => {
  const itemContentRef = React.useRef(null);

  const [{ expand, item }, dispatch] = usePanelValues();

  const handleClick = item => {
    dispatch({ type: SET_ITEM, payload: { ...item, index } });
  };

  React.useEffect(() => {
    if (itemContentRef && item && item.index === index) {
      dispatch({ type: SET_COMPONENT, payload: "modal" });
      dispatch({
        type: SET_WIDTH,
        payload: itemContentRef.current.getBoundingClientRect().width
      });
      dispatch({
        type: SET_HEIGHT,
        payload: itemContentRef.current.getBoundingClientRect().height
      });
      dispatch({
        type: SET_X,
        payload: itemContentRef.current.getBoundingClientRect().x
      });
      dispatch({
        type: SET_Y,
        payload: itemContentRef.current.getBoundingClientRect().y
      });
    }
  }, [item]);

  React.useEffect(() => {
    if (!expand) dispatch({ type: SET_NAME, selectedName: "" });
  }, [expand]);

  return (
    <ItemStyle>
      <ItemTitle onClick={() => handleClick(itemSelected)}>
        <span className="left-icon">
          <i className="fas fa-chevron-right" />
          <i className="fas fa-chevron-right" />
        </span>
        <span>{itemSelected.title}</span>
        <span className="right-icon">
          <i className="fas fa-chevron-left" />
          <i className="fas fa-chevron-left" />
        </span>
      </ItemTitle>
      <ItemContent ref={itemContentRef}>
        {itemSelected.skills.map(skill => (
          <Badge key={skill.name} obj={skill} />
        ))}
      </ItemContent>
    </ItemStyle>
  );
};

export default Skill;
