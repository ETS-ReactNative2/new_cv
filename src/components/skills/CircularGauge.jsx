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
  defaultCircumference = 0,
  defaultOffset = 0
}) => {
  const { name, percent, colors } = skill;
  const transitionDuration = 5000;
  let increaseInterval;

  const progressRef = useRef();
  const intervalRef = useRef(increaseInterval);

  const [value, setValue] = useState(0);
  const [circumference, setCircumference] = useState(defaultCircumference);
  const [offset, setOffset] = useState(defaultOffset);
  const [circleSelected, setSelect] = useState({ index, isSelected: false });

  const [{ currentIndex, expand }, dispatch] = usePanelValues();

  let interval = transitionDuration / percent;

  const handleClick = name => {
    dispatch({ type: SET_INDEX, payload: currentIndex === index ? -1 : index });
    displayQuote(name, currentIndex);
  };

  useEffect(() => {
    const strokeTransition = () => {
      let radius = progressRef.current.r.baseVal.value;
      setCircumference(2 * Math.PI * radius);
      setOffset((circumference * (100 - percent)) / 100);
      if (offset > 0 && circumference > 0) {
        progressRef.current.style.transition = `stroke-dashoffset ${transitionDuration}ms ease`;
        progressRef.current.style.strokeDashoffset = offset;
      }
    };

    strokeTransition();

    if (!expand) {
      setTimeout(() => {
        progressRef.current.style.transition = `stroke-dashoffset 0ms ease`;
        setCircumference(0);
        setOffset(0);
        setValue(0);
      }, transitionDuration / 3);
    }

    // return () => setSelect(prevSelect => ({ ...prevSelect, isSelected: false }));
  }, [expand, circumference, offset, percent]);

  useEffect(() => {
    let intervalIncrease = intervalRef.current;

    const increaseValue = () => {
      intervalIncrease = setInterval(() => {
        if (value === percent) {
          setValue(percent);
          clearInterval(intervalIncrease);
        } else setValue(v => v + 1);
      }, interval);
    };

    if (expand) increaseValue();
    return () => clearInterval(intervalIncrease);
  }, [interval, percent, value, expand]);

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
            cx="50"
            cy="50"
            r="40"
            className="circle__progress circle__progress--path"
          />
          <circle
            stroke={`${colors.length > 0 && "url(#gradient)"}`}
            ref={progressRef}
            cx="50"
            cy="50"
            r="40"
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
