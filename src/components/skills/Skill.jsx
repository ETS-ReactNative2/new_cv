import React from 'react'
import styled from 'styled-components'
import Badge from './Badge';
import { usePanelValues } from '../../context/panelContext';
import { EXPAND, SET_NAME, SET_WIDTH, SET_HEIGHT, SET_X, SET_Y, SET_ITEM } from '../../reducer/panelReducer';

const ItemContent = styled.div`
  padding: 5px;
  display: flex;
  flex-wrap: wrap;
  border-radius: 5px;
  background-color: white;
`

const ItemTitle = styled.h3`
  text-align: center;
  margin-top: 5px;
  padding: 0px;
  cursor: pointer;
`

const ItemStyle = styled.li`
  width: 100%;
  height: auto;
  border-bottom: 5px solid #ccc;
  padding: 5px;
  z-index: 1;
`

const Skill = ({ item, index }) => {
    const itemContentRef = React.useRef(null)

    const [{expand}, dispatch] = usePanelValues()

    const handleClick = item => {
        console.log(item)
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
