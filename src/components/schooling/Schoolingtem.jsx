import React from 'react'
import styled from 'styled-components'
import devices from '../../utils/devices'

const SchoolingItemStyle = styled.li`
  height: 50px;
  border-bottom: 1px solid rgba(0, 0, 0, .2);
  border-radius: 5px;
  overflow: hidden;

  &:last-child { border-bottom: none; }

  & .item-header {
    height: 50px;
    line-height: 50px;
    
    & > i {      
      margin: 0 20px;
    }

    & .item-title {font-weight: bold;}

    & .item-date {
      font-style: oblique;
      float: right;
      margin-right: 20px;
      padding: 0 5px;
    }
  }

  @media ${devices.mobileL} {
    font-size: .7em;
  }

  @media ${devices.desktop} {
    font-size: 1.2em;
    height: 100px;

    & .item-header {
      height: 100px;
      line-height: 100px;
    }
  }
`

const SchoolingItem = ({ item }) => {

    /* const handleClick = index => {
        setIndex(currentIndex === index ? -1 : index)
    } */

    return (
      <SchoolingItemStyle>
        <div className='item-header'>
            <span className='item-title'>{item.title}</span>
            <span className='item-date'>{item.date}</span>
        </div>
      </SchoolingItemStyle>
    )
}

export default SchoolingItem
