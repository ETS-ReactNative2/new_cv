import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import devices from '../../utils/devices'
import panels from '../../utils/panels'
import Panel from './Panel';

const PanelsStyle = styled.div`
    width: 700px;
    min-height: 600px;
    display: grid;
    grid-template-columns: repeat(2, 50%);
    grid-template-rows: repeat(2, 50%);
    position: relative;
    justify-content: center;
    padding: 0;
    margin: 0;

    @media ${devices['mobileL']} {
        width: 100%;
        grid-template-columns: repeat(2, 50%);
        border: 1px solid red;
    }
`

const Panels = () => {
    const appRef = useRef()

    const [currentIndex, setIndex] = useState(-1)
    const [width, setWidth] = useState()
    const [height, setHeight] = useState()
    const [x, setX] = useState()
    const [y, setY] = useState()

    useEffect(() => {
        if (appRef) {
            setWidth(appRef.current.getBoundingClientRect().width)
            setHeight(appRef.current.getBoundingClientRect().height)
            setX(appRef.current.getBoundingClientRect().x)
            setY(appRef.current.getBoundingClientRect().y)
        }
    }, [appRef])

    return (
        <PanelsStyle ref={appRef}>
            {
                panels.map((panel, i) => (
                    <Panel
                        key={i}
                        index={i}
                        icon={panel.icon}
                        currentIndex={currentIndex}
                        setIndex={setIndex}
                        title={panel.title}
                        parentWidth={width}
                        parentHeight={height}
                        parentX={x}
                        parentY={y} 
                    />
                ))
            }
        </PanelsStyle>
    )
}

export default Panels
