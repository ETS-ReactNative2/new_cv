import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import devices from "../../utils/devices";
import { usePanelValues } from "../../context/panelContext";
import { SET_INDEX } from "../../reducer/panelReducer";

const CircularGaugeStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 25px;

  & .circle {
    position: relative;
    cursor: pointer;

    & .circle__svg {
      transform: rotate(-90deg);

      & .circle__progress {
        fill: none;
        // stroke: olive;
        stroke-width: 3;
        stroke-opacity: 0.3;
        stroke-linecap: round;
      }

      & .circle__progress--fill {
        stroke-opacity: 1;
        stroke-dasharray: ${props => props.initialStroke};
        stroke-dashoffset: ${props => props.initialStroke};
      }
    }
  }

  & .percent,
  & .label {
    color: white;
  }

  & .percent {
    top: 50%;
    left: 50%;
    position: absolute;
    font-weight: bold;
    transform: translate(-50%, -50%);

    & .value {
      font-size: 28px;
    }
  }

  & .label {
    font-size: ${props => (props.isSelected ? "1.5em" : "1.2em")};
    text-decoration: ${props => (props.isSelected ? "underline" : "none")};
    transition: font-size 900ms ease;
  }

  @media ${devices.desktop} {
    margin: 0 50px;
    padding: 24px;

    & .circle {
      transform: scale(1.7);
      margin-bottom: 20px;
    }
  }

  @media ${devices.tablet} {
    transform: scale(0.7);
    margin: 0 15px;
  }

  @media ${devices.mobileL} {
    transform: scale(0.5);
    margin: 0;

    @media (orientation: landscape) {
      visibility: hidden;
    }
  }
`;

const CircularGauge = ({
  skill,
  displayQuote,
  index,
  expand,
  radius,
  cx,
  cy
}) => {
  const { name, percent, colors } = skill;
  const transitionDuration = 5000;
  let increaseInterval;
  let circumference = 2 * Math.PI * radius;

  const progressRef = useRef();

  const [value, setValue] = useState(0);
  const [offset, setOffset] = useState(0);
  const [circleSelected, setSelect] = useState({ index, isSelected: false });

  const [{ currentIndex }, dispatch] = usePanelValues();

  let interval = transitionDuration / percent;

  const handleClick = name => {
    dispatch({ type: SET_INDEX, payload: currentIndex === index ? -1 : index });
    displayQuote(name, currentIndex);
  };

  const increaseValue = () => {
    increaseInterval = setInterval(() => {
      if (value >= percent) {
        clearInterval(increaseInterval);
        setValue(percent);
      } else setValue(v => v + 1);
    }, interval);
  };

  useEffect(() => {
    return () =>
      setSelect(prevSelect => ({ ...prevSelect, isSelected: false }));
  }, [expand]);

  useEffect(() => {
    if (expand) {
      progressRef.current.style.transition = `stroke-dashoffset ${transitionDuration}ms ease-in-out`;
      setOffset((circumference * (100 - percent)) / 100);
    } else {
      progressRef.current.style.transition = `stroke-dashoffset 0ms ease`;
      setTimeout(() => {
        setValue(0);
        setOffset(circumference);
      }, 100);
    }
  }, [expand, offset]);

  useEffect(() => {
    if (offset > 0)
      setTimeout(() => {
        progressRef.current.style.strokeDashoffset = offset;
      }, 100);
  }, [offset]);

  useEffect(() => {
    if (expand) increaseValue();
    return () => clearInterval(increaseInterval);
  }, [value, expand]);

  useEffect(() => {
    setSelect(prevSelect => ({
      ...prevSelect,
      isSelected:
        prevSelect.index !== currentIndex || currentIndex === -1 ? false : true
    }));
  }, [currentIndex]);

  return (
    <CircularGaugeStyle
      initialStroke={circumference}
      isSelected={circleSelected.isSelected}
    >
      <div as="button" className="circle" onClick={() => handleClick(name)}>
        <svg width="100" height="100" className="circle__svg">
          {expand && colors.length > 0 && (
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                {colors.map((color, i) => {
                  let length = colors.length;

                  return (
                    <stop
                      key={i}
                      offset={`${i === 0 ? 0 : 100 / (length - i)}%`}
                      stopColor={color}
                    />
                  );
                })}
              </linearGradient>
            </defs>
          )}
          <circle
            cx={cx}
            cy={cy}
            r={radius}
            className="circle__progress circle__progress--path"
          />
          <circle
            stroke={`${colors.length > 0 && "url(#gradient)"}`}
            ref={progressRef}
            cx={cx}
            cy={cy}
            r={radius}
            className="circle__progress circle__progress--fill"
          />
        </svg>
        <div className="percent">
          {percent !== 100 && <span className="value">{value}%</span>}
        </div>
      </div>
      <span className="label">{name}</span>
    </CircularGaugeStyle>
  );
};

export default CircularGauge;
