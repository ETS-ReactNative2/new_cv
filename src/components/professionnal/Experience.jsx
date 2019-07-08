import React, { useEffect, useRef, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import styled from 'styled-components'
import devices from '../../utils/devices'

const ExperienceStyle = styled.li`
  height: 50px;
  border-bottom: 1px solid rgba(0, 0, 0, .2);
  border-radius: 5px;
  overflow: hidden;
  transition: height ${props => props.itemTransitionDuration}ms ease-in-out;

  & .item-header {
    height: 50px;
    line-height: 50px;
    cursor: pointer;
    
    & > i {      
      margin: 0 20px;
      transition: transform ${props => props.itemTransitionDuration}ms ease-in-out;
    }

    & .item-title {font-weight: bold;}

    & .item-date {
      font-style: oblique;
      float: right;
      margin-right: 20px;
      padding: 0 5px;
    }
  }

  & .item-description {
    font-size: .85em;
    margin-left: 20px;
    padding-bottom: 20px;

    & > .highlight {
      & a {
        text-decoration: none;
        color: darkgreen;
      }

      & span {
        background-color: royalblue;
        color: white;
        border-radius: 10px;
        padding: 0 5px;
      }
    }
  }

  @media ${devices.desktop} {
    padding: 20px 0 80px;

    & .item-description {
      padding-bottom: 80px;
    }
  }

  @media ${devices.mobileL} {
    font-size: .7em;
  }
`

const Experience = ({ item, index, currentIndex, setIndex }) => {
    const itemRef = useRef()
    const itemTitleRef = useRef()
    const itemContentRef = useRef()
    const itemIconArrow = useRef()

    const [itemDiv, setExperienceDiv] = useState({ id: index, isExpanded: false })

    const expandDiv = () => {
        if (itemDiv.isExpanded && currentIndex === itemDiv.id) {
            itemRef.current.style.height = `${itemTitleRef.current.getBoundingClientRect().height + itemContentRef.current.getBoundingClientRect().height}px`
            itemIconArrow.current.style.transform = 'rotate(450deg)'
        }
    }

    const reduceDiv = () => {
        if (!itemDiv.isExpanded && (currentIndex === -1 || currentIndex !== itemDiv.id)) {
            itemRef.current.style.height = `${itemTitleRef.current.getBoundingClientRect().height}px`
            itemIconArrow.current.style.transform = 'rotate(0)'
        }
    }

    const handleClick = index => {
        setIndex(currentIndex === index ? -1 : index)
    }

    useEffect(() => {
        setExperienceDiv(prevExperienceDiv => ({
            ...prevExperienceDiv,
            isExpanded: currentIndex === -1 || currentIndex !== prevExperienceDiv.id ? false : true
        }))
    }, [currentIndex])

    useEffect(() => itemDiv.isExpanded ? expandDiv() : reduceDiv(), [itemDiv.isExpanded])

    return (
        <ExperienceStyle
            itemTransitionDuration={600}
            id={index}
            ref={itemRef}>
            <div onClick={() => handleClick(index)} ref={itemTitleRef} className='item-header'>
                <i ref={itemIconArrow} className='fas fa-caret-right'></i>
                <span className='item-title'>{item.title}</span>
                <span className='item-date'>{item.date}</span>
            </div>
            <div ref={itemContentRef} className='item-description'>
                <ReactMarkdown className='highlight' escapeHtml={false} source={item.description} />
            </div>
        </ExperienceStyle>
    )
}

export default Experience
