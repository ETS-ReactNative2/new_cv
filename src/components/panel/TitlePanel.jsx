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
    overflow: hidden;

    &:hover {
        background-color: #aaa;
    }

    & > .title-icon {
        width: 1em;
        display: flex;
        justify-content: center;
        flex-direction: column;
        margin-right: 20px;
        transform: translateY(${props => props.iconY}%);
        transition: transform ${props => props.transitionDuration}ms ${props => props.currentIndex === -1 ? 300 : 0}ms ease;
        position: absolute;

        & > i { padding: 5px 0px; }
    }

    & > .title-text {
        text-shadow: 2px 3px 7px rgba(0, 0, 0, .5);
    }

    @media ${devices.desktop} {
        height: 50px;
        line-height: 50px;
    }

    @media ${devices.mobileL} { 
        height: 20px;
        font-size: .8em; 
        line-height: 20px;
        & > .title-icon { margin-right: 10px; }
    }
`

const TitlePanel = ({ handleClick, icon, title, color, index, currentIndex, parentWidth, itemWidth, itemHeight, transitionDuration }) => {
    const iconTitleRef = useRef()

    const [typed, setTyped] = useState("")
    const [iconY, setIconY] = useState(0)

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

    useEffect(() => {
        if (iconTitleRef)
            setIconY(currentIndex === index ? -50 : 0)
    }, [currentIndex])
    
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
            iconY={iconY}
        >
            <span ref={iconTitleRef} className='title-icon'>
                <i className={`fas fa-${icon}`}></i>
                <i className={`fas fa-arrow-left`}></i>
            </span>
            <span className='title-text'>{typed}</span>
        </TitlePanelStyle>
  )
}

export default TitlePanel
