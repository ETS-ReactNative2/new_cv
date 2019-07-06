import React, { useRef, useState, useEffect } from 'react'
import styled from 'styled-components'
import Quote from '../skills/Quote';
import CircularGauge from '../skills/CircularGauge';
import DimmerCloseBtn from './DimmerCloseBtn';
import { SET_NAME, MINIMIZE } from '../../reducer/panelReducer';
import { usePanelValues } from '../../context/panelContext';

const ItemContentShadow = styled.div`
  width: ${props => props.expand ? '80%' : props.width + 'px'};
  height: ${props => props.expand ? '80%' : props.height + 'px'};
  left: ${props => props.expand ? '50%' : props.left + 'px'};
  top: ${props => props.expand ? '50%' : props.top + 'px'};
  transform: translate(-50%, -50%);
  border-radius: 5px;
  background-color: ${props => props.expand ? '#29323c' : 'white'};
  position: absolute;
  transition: width ${props => props.expandDuration}ms ease-in, height ${props => props.expandDuration}ms ease-in, left ${props => props.expandDuration}ms ease-in, top ${props => props.expandDuration}ms ease-in, background-color ${props => props.expandDuration}ms ease-in;

  & > div {
    overflow-y: auto;
    padding: 5px;
    display: flex;
    flex-wrap: wrap;
  } 
`

const DimmerContent = () => {
    const itemContentShadowRef = useRef()

    const [isQuoteDisplayed, setQuoteDisplay] = useState(false)

    const [{ item, panelWidth, panelHeight, panelX, panelY, expand, expandDuration, currentIndex }, dispatch] = usePanelValues()

    const displayQuote = (name, index) => {
        setQuoteDisplay(index !== currentIndex ? true : false)
        dispatch({ type: SET_NAME, payload: name })
    }

    const handleClose = () => {
        setQuoteDisplay(false)
        dispatch({ type: MINIMIZE })
    }

    console.log(item)

    return (
        <ItemContentShadow
            ref={itemContentShadowRef}
            width={panelWidth}
            height={panelHeight}
            left={panelX}
            top={panelY}
            expandDuration={expandDuration}
            expand={expand}
        >
            <div>
                {
                    expand && <DimmerCloseBtn handleClick={handleClose} />
                }
                {
                    item && item.skills.map((skill, i) => (
                        <CircularGauge
                            key={i}
                            index={i}
                            displayQuote={displayQuote}
                            skill={skill} 
                        />
                    ))
                }
                {
                    item &&
                    <Quote
                        display={isQuoteDisplayed}
                        skills={item.skills}
                    />
                }
            </div>
        </ItemContentShadow>
    )
}

export default DimmerContent
