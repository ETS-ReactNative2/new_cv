import React, { useState, useRef, useEffect} from 'react'
import styled from 'styled-components'
import devices from '../../utils/devices'

const TitlePanelStyle = styled.h3`
    cursor: pointer;
    text-align: center;
    border-left: 4px solid rgba(0, 0, 0, .8);
    border-right: 4px solid rgba(0, 0, 0, .8);
    margin: 0;
    padding: 0 5px;
    height: 30px;
    width: 80%;
    background-color: ${props => props.color};
    left: ${props => props.index !== props.currentIndex ? props.normalX/2 : props.expandX/2}px;
    top: ${props => props.index !== props.currentIndex ? props.y/2 : 10}px;
    transform: translate(-50%, ${props => props.index !== props.currentIndex ? -50 : 0}%);
    transition: top ${props => props.transitionDuration}ms ${props => props.currentIndex === -1 ? 300 : 0}ms ease, left ${props => props.transitionDuration}ms ease, background-color 500ms ease;
    box-shadow: 2px 5px 5px rgba(0, 0, 0, .7);
    position: absolute;
    display: inline;

    &:hover {
        background-color: #aaa;
    }

    & > i {
        margin-right: 20px;
    }

    @media ${devices.mobileL} { 
        font-size: .8em; 
        line-height: 30px;
        & > i { margin-right: 10px; }
    }
`

const TitlePanel = ({ handleClick, icon, title, color, index, currentIndex, parentWidth, itemWidth, itemHeight, transitionDuration }) => {
    const iconRef = useRef()
    const textRef = useRef()

    const [typed, setTyped] = useState("")

    const runTyped = index => {
        let interval = setInterval(() => {
            let tab = Array.from(title)
            setTyped(prevTyped => `${prevTyped}${tab[index]}`)
            index++
            if (index === tab.length) {
                clearInterval(interval)
            }
        }, 200)
    }

    useEffect(() => {
        let index = 0
        runTyped(index)
    }, [])
    
    return (
        <TitlePanelStyle 
            onClick={handleClick}
            index={index}
            currentIndex={currentIndex}
            normalX={+itemWidth}
            expandX={+parentWidth}
            y={+itemHeight}
            transitionDuration={transitionDuration}
            color={color}
        >
            <i ref={iconRef} className={`fas fa-${icon}`}></i>
            <span ref={textRef}>{typed}</span>
        </TitlePanelStyle>
  )
}

export default TitlePanel
