import React from 'react'
import styled from 'styled-components'
import devices from '../utils/devices'

const ItemStyle = styled.div`
  position: relative;
  width: 100%;

  &:nth-child(1) {
    z-index: ${props => props.index + 1 === 1 ? 99 : 0};
    opacity: ${props => props.index !== 0 && props.index !== -1 ? 0 : 1};
    transition: opacity ${props => props.transitionDuration + 100}ms cubic-bezier(1,0,1,.3);
  }

  &:nth-child(2) {
    z-index: ${props => props.index + 1 === 2 ? 99 : 0};
    opacity: ${props => props.index !== 1 && props.index !== -1 ? 0 : 1};
    transition: opacity ${props => props.transitionDuration + 100}ms cubic-bezier(1,0,1,.3);
  }

  &:nth-child(3) {
    z-index: ${props => props.index + 1 === 3 ? 99 : 0};
    opacity: ${props => props.index !== 2 && props.index !== -1 ? 0 : 1};
    transition: opacity ${props => props.transitionDuration + 100}ms cubic-bezier(1,0,1,.3);
  }

  &:nth-child(4) {
    z-index: ${props => props.index + 1 === 4 ? 99 : 0};
    opacity: ${props => props.index !== 3 && props.index !== -1 ? 0 : 1};
    transition: opacity ${props => props.transitionDuration + 200}ms cubic-bezier(1,0,1,.3);
  }

  & > div {
    box-shadow: 2px 2px 4px rgba(0, 0, 0, .8);
    display: flex;
    position: absolute;
    padding: 5px;
    background-color: #4c75a3;
    border: 1px solid;
    border-radius: 10px;
    width: ${props => props.width}px;
    height: ${props => props.height}px;
    transform: translate(${props => props.x}px, ${props => props.y}px);
    align-items: ${props => props.index !== -1 ? 'start' : 'center'};
    justify-content: center;
    overflow: hidden;
    
    transition: width ${props => props.transitionDuration}ms ease, height ${props => props.transitionDuration}ms ease, transform ${props => props.transitionDuration}ms ease, align-items ${props => props.transitionDuration}ms ease;

    & > h3 {
      cursor: pointer;
      text-align: center;
      border-left: 4px solid rgba(0, 0, 0, .8);
      border-right: 4px solid rgba(0, 0, 0, .8);
      margin: 0;
      padding: 0 5px;
      height: 30px;
      opacity: ${props => props.titleOpacity};
      transition: opacity ${props => props.transitionDuration / 2}ms ease;
      box-shadow: 2px 5px 5px rgba(0, 0, 0, .7);

      & > i {
        margin-right: 20px;
      }

      @media ${devices.mobileL} {

        & > i {
          display: ${props => props.index === -1 && 'flex'};
          justify-content: center;
          margin-right: ${props => props.index === - 1 ? 0 : 20}px;
        }

        & > span {
          visibility: ${props => props.index === - 1 ? 'hidden' : 'visible'};
        }
      }
    }

    & > p {
      padding: 20px 5px;
      position: absolute;
      width: ${props => props.contentWidth}px;
      transform: translateX(${props => props.contentDisplay ? 0 : -100}%);
      transition: transform ${props => props.transitionDuration}ms ease;
    }
  }
`

const Item = ({ title, currentIndex, index, setIndex, parentWidth, parentHeight, parentX, parentY, icon }) => {
    const transitionDuration = 600
    const itemRef = React.useRef()

    const [defaultWidth, setDefaultWidth] = React.useState()
    const [defaultHeight, setDefaultHeight] = React.useState()
    const [defaultX, setDefaultX] = React.useState()
    const [defaultY, setDefaultY] = React.useState()
    const [width, setWidth] = React.useState()
    const [height, setHeight] = React.useState()
    const [x, setX] = React.useState(0)
    const [y, setY] = React.useState(0)
    const [titleOpacity, setTitleOpacity] = React.useState(1)
    const [contentDisplay, setContentDisplay] = React.useState(false)

    const expandBlock = () => {
        setWidth(index !== currentIndex ? parentWidth : defaultWidth)
        setHeight(index !== currentIndex ? parentHeight : defaultHeight)
        setX(index !== currentIndex ? (index === 1 || index === 3 ? -width : 0) : defaultX)
        setY(index !== currentIndex ? (index === 2 || index === 3 ? -height : 0) : defaultY)
        setContentDisplay(index !== currentIndex ? true : false)
        setTitleOpacity(1)
    }

    const handleClick = () => {
        setIndex(currentIndex === index ? -1 : index)
        setTitleOpacity(0)
        expandBlock()
    }

    React.useEffect(() => {
        if (itemRef) {
            setDefaultWidth(itemRef.current.getBoundingClientRect().width)
            setWidth(itemRef.current.getBoundingClientRect().width)
            setDefaultHeight(itemRef.current.getBoundingClientRect().height)
            setHeight(itemRef.current.getBoundingClientRect().height)
        }
    }, [])

    return (
        <ItemStyle
            ref={itemRef}
            transitionDuration={transitionDuration}
            width={width}
            height={height}
            x={x}
            y={y}
            index={currentIndex}
            titleOpacity={titleOpacity}
            contentDisplay={contentDisplay}
            contentWidth={parentWidth}>
            <div>
                <h3 onClick={handleClick}>
                    <i className={`fas fa-${icon}`}></i>
                    <span>{title}</span>
                </h3>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sagittis tortor vel urna ornare, quis aliquet neque consectetur. Ut euismod libero risus. Nunc interdum felis magna, et lobortis augue semper id. Sed ut augue magna. Mauris sit amet tristique ipsum. Morbi diam arcu, volutpat dictum leo sodales, mattis bibendum ligula. Pellentesque vel elit eu enim egestas porta. In hac habitasse platea dictumst. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aliquet risus magna, ac pharetra arcu ullamcorper eget. Etiam sollicitudin odio in nibh vestibulum, sed semper justo varius.
        </p>
            </div>
        </ItemStyle>
    )
}

export default Item
