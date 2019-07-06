import React from 'react'
import styled from 'styled-components'
import TitlePanel from '../TitlePanel';
import Skills from '../skills/Skills';
import skills from '../../utils/skills'

const PanelStyle = styled.div`
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
    background-color: #abbaab;
    border: 1px solid;
    border-radius: 10px;
    width: ${props => props.width}px;
    height: ${props => props.height}px;
    transform: translate(${props => props.x}px, ${props => props.y}px);
    justify-content: center;
    overflow: hidden;
    
    transition: width ${props => props.transitionDuration}ms ease, height ${props => props.transitionDuration}ms ease, transform ${props => props.transitionDuration}ms ease, align-items ${props => props.transitionDuration}ms ease;

    & > section {
      padding: 0px 20px 5px 20px;
      margin-top: 40px;
      position: absolute;
      width: ${props => props.contentWidth}px;
      transform: translateX(${props => props.contentDisplay ? 0 : -100}%);
      transition: transform ${props => props.transitionDuration}ms ${props => props.index === -1 ? 0 : 300}ms ease;
    }
  }
`

const ChoosePanel = ({name}) => {
  switch (name) {
    case 'Skills':
      return <Skills items={skills} />

    default:
      return (
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. A unde, quam nam ut amet laborum iusto id, voluptate, temporibus beatae maiores accusamus sit neque. Molestias, rerum. Omnis corporis ad iure obcaecati in error repudiandae saepe deserunt officia nesciunt quae ea, cumque consequuntur, labore laborum iste provident. Corrupti ea, illo inventore, sed accusamus velit non quasi voluptatem, quia doloremque libero labore minus aliquam dolores. Quod repellat architecto odit corporis commodi quibusdam.
        </p>
      )
  }
}

const Panel = ({ title, currentIndex, index, setIndex, parentWidth, parentHeight, parentX, parentY, icon }) => {
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
  const [contentDisplay, setContentDisplay] = React.useState(false)

  const expandBlock = () => {
    setWidth(index !== currentIndex ? parentWidth : defaultWidth)
    setHeight(index !== currentIndex ? parentHeight : defaultHeight)
    setX(index !== currentIndex ? (index === 1 || index === 3 ? -width : 0) : defaultX)
    setY(index !== currentIndex ? (index === 2 || index === 3 ? -height : 0) : defaultY)
    setContentDisplay(index !== currentIndex ? true : false)
  }

  const handleClick = () => {
      setIndex(currentIndex === index ? -1 : index)
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
    <PanelStyle
      ref={itemRef}
      transitionDuration={transitionDuration}
      width={width}
      height={height}
      x={x}
      y={y}
      index={currentIndex}
      contentDisplay={contentDisplay}
      contentWidth={parentWidth}
    >
      <div>
        <TitlePanel 
          handleClick={handleClick} 
          icon={icon} 
          title={title} 
          transitionDuration={transitionDuration}
          index={currentIndex}
          parentWidth={parentWidth}
          parentHeight={parentHeight}
          itemWidth={defaultWidth}
          itemHeight={defaultHeight}
        />
        <section>
          <ChoosePanel name={title} />
        </section>
      </div>
    </PanelStyle>
  )
}

export default Panel
