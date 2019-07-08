import React from 'react'
import styled from 'styled-components'
import devices from '../../utils/devices';

const ItemDimmerClose = styled.span`
  position: absolute;
  top: -2%;
  right: -1%;
  border-radius: 50%;
  padding: 0 5px;
  width: 25px;
  height: 25px;
  background-color: white;
  text-align: center;
  line-height: 25px;
  cursor: pointer;

    @media ${devices.desktop} {
        top: -2%;
        right: -1%;
        padding: 0 15px;
        width: 50px;
        height: 50px;
        line-height: 50px;
    }
`

const DimmerCloseBtn = ({ handleClick }) => {
    return (
        <ItemDimmerClose onClick={handleClick}>
            <i className='fas fa-times'></i>
        </ItemDimmerClose>
    )
}

export default DimmerCloseBtn
