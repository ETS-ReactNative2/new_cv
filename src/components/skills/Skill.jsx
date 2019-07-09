import React from 'react'
import styled from 'styled-components'
import Badge from './Badge';
import { usePanelValues } from '../../context/panelContext';
import { EXPAND, SET_NAME, SET_WIDTH, SET_HEIGHT, SET_X, SET_Y, SET_ITEM } from '../../reducer/panelReducer';
import devices from '../../utils/devices';

const ItemContent = styled.div`
  padding: 5px;
  display: flex;
  flex-wrap: wrap;
  border-radius: 5px;
`

const ItemTitle = styled.h3`
  text-align: center;
  margin-top: 5px;
  padding: 0px;
  cursor: pointer;
  text-shadow: 2px 3px 7px rgba(0, 0, 0, .3);
`

const ItemStyle = styled.li`
  width: 100%;
  height: auto;
  padding: 0 5px;
  z-index: 1;
  border-bottom: 2px solid rgba(0, 0, 0, .2);
  &:last-child { border-bottom: none; }

  @media ${devices.mobileL} {
      font-size: .8em;
  }
`

const Skill = ({ item, index }) => {
    const itemContentRef = React.useRef(null)

    const [{expand}, dispatch] = usePanelValues()

    const handleClick = item => {
        dispatch({ type: EXPAND })
        dispatch({ type: SET_ITEM, payload: item })
    }

    React.useEffect(() => {
        if (itemContentRef) {
            dispatch({ type: SET_WIDTH, payload: itemContentRef.current.getBoundingClientRect().width })
            dispatch({ type: SET_HEIGHT, payload: itemContentRef.current.getBoundingClientRect().height })
            dispatch({ type: SET_X, payload: itemContentRef.current.getBoundingClientRect().x })
            dispatch({ type: SET_Y, payload: itemContentRef.current.getBoundingClientRect().y })
        }
    }, [])

    React.useEffect(() => {
        if (!expand) dispatch({ type: SET_NAME, selectedName: '' })
    }, [expand])

    return (
        <ItemStyle>
            <ItemTitle onClick={() => handleClick(item)}>{item.title}</ItemTitle>
            <ItemContent
                ref={itemContentRef}>
                {
                    item.skills.map(skill => (
                        <Badge key={skill.name} obj={skill} />
                    ))
                }
            </ItemContent>            
        </ItemStyle>
    )
}

export default Skill
