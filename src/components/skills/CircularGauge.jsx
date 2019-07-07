import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import devices from '../../utils/devices'
import { usePanelValues } from '../../context/panelContext';
import { SET_INDEX } from '../../reducer/panelReducer';

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
        stroke-opacity: .3;
        stroke-linecap: round;
      }

      & .circle__progress--fill {
        stroke-opacity: 1;
        stroke-dasharray: ${props => props.initialStroke};
        stroke-dashoffset: ${props => props.initialStroke};
      }
    }
  }

  & .percent, & .label { color: white; }

  & .percent {
    top: 50%;
    left: 50%;
    position: absolute;
    font-weight: bold;
    transform: translate(-50%, -50%);

    & .value { 
        font-size: 28px; 
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        outline-style:none;
    }
  }

  & .label {
    font-size: ${props => props.isSelected ? '1.5em' : '1.2em'};
    text-decoration: ${props => props.isSelected ? 'underline' : 'none'};
    transition: font-size 900ms ease;
  }

  @media ${devices.tablet} {
    transform: scale(.7);
    margin: 0 15px;
  }

  @media ${devices.mobileL} {
    transform: scale(.5);
    margin: 0;
  }
`

const CircularGauge = ({ skill, displayQuote, index }) => {
    const { name, percent, colors } = skill
    const transitionDuration = 5000

    const progressRef = useRef()

    const [value, setValue] = useState(0)
    const [circumference, setCircumference] = useState(0)
    const [offset, setOffset] = useState(0)
    const [circleSelected, setSelect] = useState({ index, isSelected: false })

    const [{currentIndex, expand}, dispatch] = usePanelValues()

    let interval = transitionDuration / percent
    let increaseInterval = null

    const handleClick = name => {
        dispatch({ type: SET_INDEX, payload: currentIndex === index ? -1 : index})
        displayQuote(name, currentIndex)
    }

    const strokeTransition = () => {
        let radius = progressRef.current.r.baseVal.value
        setCircumference(2 * Math.PI * radius)
        setOffset(0)
    }

    const increaseValue = () => {
        increaseInterval = setInterval(() => {
            if (value === percent) {
                clearInterval(increaseInterval)
            }
            else setValue(v => v + 1)
        }, interval)
    }

    useEffect(() => {
        strokeTransition()
        return () => setSelect(prevSelect => ({ ...prevSelect, isSelected: false }))
    }, [expand])

    useEffect(() => {
        if (expand) {
            progressRef.current.style.transition = `stroke-dashoffset ${transitionDuration}ms ease`
            setOffset(circumference * (100 - percent) / 100)
        }
        else if (!expand) {
            progressRef.current.style.transition = `stroke-dashoffset 0ms ease`
            setTimeout(() => {
                setValue(0)
                setOffset(circumference)
            }, 700)
        }
    }, [circumference, expand])

    useEffect(() => {
        if (offset >= 0) setTimeout(() => {
            progressRef.current.style.strokeDashoffset = offset
        }, 100)
    }, [offset, expand])

    useEffect(() => {
        if (expand) increaseValue()
        return () => clearInterval(increaseInterval)
    }, [value, expand])

    useEffect(() => {
        setSelect(prevSelect => ({
            ...prevSelect,
            isSelected: prevSelect.index !== currentIndex || currentIndex === -1 ? false : true
        }))
    }, [currentIndex])

    return (
        <CircularGaugeStyle
            initialStroke={circumference}
            isSelected={circleSelected.isSelected}
        >
            <div as='button' className="circle" onClick={() => handleClick(name)}>
                <svg width="100" height="100" className="circle__svg">
                    {
                        expand && colors.length > 0 &&
                        <defs>
                            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                {
                                    colors.map((color, i) => {
                                        let length = colors.length

                                        return <stop key={i} offset={`${i === 0 ? 0 : (100 / (length - i))}%`} stopColor={color} />
                                    })
                                }
                            </linearGradient>
                        </defs>
                    }
                    <circle cx="50" cy="50" r="40" className="circle__progress circle__progress--path"></circle>
                    <circle stroke={`${colors.length > 0 && 'url(#gradient)'}`} ref={progressRef} cx="50" cy="50" r="40" className="circle__progress circle__progress--fill"></circle>
                </svg>
                <div className="percent">
                    {percent !== 100 && <span className="value">{value}%</span>}
                </div>
            </div>
            <span className="label">{name}</span>
        </CircularGaugeStyle>
    )
}

export default CircularGauge
