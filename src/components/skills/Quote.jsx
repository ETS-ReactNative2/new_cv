import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import devices from '../../utils/devices'
import { usePanelValues } from '../../context/panelContext';

const QuoteStyle = styled.div`
  box-sizing: border-box;
  width: 99%;
  min-height: 100px;
  position: absolute;
  padding: 5px 10px;
  border: 1px solid rgba(255, 255, 255, .7);
  border-radius: 10px;
  overflow: auto;
  color: white;
  bottom: 5px;

  & > span {    
    position: absolute;
    opacity: ${props => props.index === -1 ? 0 : 1};
    font-style: oblique;
    transform: translateX(${props => props.x}%);
    transition: transform ${props => props.slideDuration}ms ease, opacity ${props => props.slideDuration}ms ease-out;
  }

  @media ${devices.mobileL} {
    font-size: .7em;
  }
`

const Quote = ({ display, skills }) => {
    const slideDuration = 900

    const quoteRef = useRef()

    const [{currentIndex, selectedName}, dispatch] = usePanelValues()

    const [quote, setQuote] = useState('')
    const [index, setIndex] = useState(currentIndex)
    const [x, setX] = useState(-200)

    const transitionQuote = () => {
        if (quoteRef) {
            if (!display || currentIndex === -1)
                setX(-200)
            else if (display && index === -1)
                setX(0)
            else if (display && index !== currentIndex) {
                setX(-200)
                setTimeout(() => setX(0), slideDuration)
            }
            setIndex(currentIndex)
        }
    }

    useEffect(() => {
        transitionQuote()
    }, [display, currentIndex])

    useEffect(() => {
        if (selectedName) skills.find(skill => {
            if (skill.name === selectedName)
                setTimeout(() => setQuote(skill.quote), 300)
        })
        else setQuote('')
    }, [selectedName])

    return (
        <QuoteStyle slideDuration={slideDuration} x={x} index={currentIndex}>
            <span>"{quote}"</span>
        </QuoteStyle>
    )
}

export default Quote
