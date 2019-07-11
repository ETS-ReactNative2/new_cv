import React from 'react'
import styled from 'styled-components'
import { usePanelValues } from '../../context/panelContext';
import { MINIMIZE } from '../../reducer/panelReducer';
import Tooltip from '../tooltip/Tooltip';
import DimmerCloseBtn from '../dimmer/DimmerCloseBtn';

const ContentStyle = styled.div`
    border: 2px solid white;
    width: ${props => props.expand ? '80%' : '0px'};
    height: ${props => props.expand ? '80%' : '0px'};
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
    transition: width ${props => props.expandDuration}ms ease-in, height ${props => props.expandDuration}ms ease-in;

    & > div {
        width: 100%;
        height: 100%;
    }
`

const SidenoteContent = () => {
    const [{ expand, expandDuration }, dispatch] = usePanelValues()

    const handleClose = () => dispatch({ type: MINIMIZE })

  return (
      <ContentStyle expand={expand} expandDuration={expandDuration}>
      <div>
          <Tooltip>
            Yes we can
          </Tooltip>
          <DimmerCloseBtn handleClick={handleClose} />
      </div>
    </ContentStyle>
  )
}

export default SidenoteContent
