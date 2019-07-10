import React, { useRef, useEffect, useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { arrowToRight } from '../../utils/arrowKeyframes'

const slideBtn = keyframes`
    to { right: 110vw; }
`

const BtnStyle = styled.div`
    position: fixed;
    margin: 0;
    padding: 0;
    bottom: 10px;
    right: ${props => props.x}px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: red;
    display: flex;
    justify-content: center;
    align-items center;
    color: white;
    overflow: hidden;
    transform:  scale(${props => props.isHold ? 1.3 : 1});
    transition: transform ${props => props.duration}ms ease, right ${props => props.x < 150 ? 0 : props.duration * 3}ms ease;

    & > section {
        position: absolute;
        display: grid;
        width: 100px;
        grid-template-columns: repeat(2, 50%);
        transform: translateX(${props => props.isHold ? -25 : 25}%);
        transition: transform ${props => props.duration}ms ease;

        & > span { 
            width: 100%; 
            text-align: center;
        }

        & .second {
            font-size: 12px;
        }

        & .second > i:nth-child(1) {
            animation: ${arrowToRight} 1000ms ${props => props.duration + 100}ms ease-in infinite;
        }

        & .second > i:nth-child(2) {
            animation: ${arrowToRight} 1000ms ${props => props.duration + 200}ms ease-in infinite;
        }

        & .second > i:nth-child(3) {
            animation: ${arrowToRight} 1000ms ${props => props.duration + 300}ms ease-in infinite;
        }
    }
`

const SidenoteBtn = () => {
    const X_POS = 10
    const duration = 400

    const btnRef = useRef()

    const [isHold, setHold] = useState(false)
    const [btnX, setBtnX] = useState(X_POS)

    const moveBtn = e => {
        let screenWidth = window.screen.width
        let x = screenWidth - e.nativeEvent.clientX - btnRef.current.getBoundingClientRect().width - X_POS
        if (btnX < 150 && isHold) setBtnX(x)
        else if (isHold) setBtnX(screenWidth + 20)
    }

    const resetMoveBtn = () => setBtnX(X_POS)

    const handleMouseClick = (isHold) => {
        if (btnX < 150) setHold(isHold)
        if (!isHold) resetMoveBtn()
    }

    return (
        <BtnStyle 
            ref={btnRef}
            onMouseDown={() => handleMouseClick(true)} 
            onMouseUp={() => handleMouseClick(false)}
            onMouseMove={moveBtn}
            isHold={isHold}
            x={btnX}
            duration={duration}
        >
            <section>
                <span className='first'><i className='fas fa-comment-dots'></i></span>
                <span className='second'>
                    <i className='fas fa-chevron-left'></i>
                    <i className='fas fa-chevron-left'></i>
                    <i className='fas fa-chevron-left'></i>
                </span>
            </section>
        </BtnStyle>
    )
}

export default SidenoteBtn
