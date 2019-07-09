import React from 'react'
import styled from 'styled-components'

const HelperStyle = styled.div`
    border-radius: 5px;
    background-color: #27ae60;
    margin: 0;
    font-size: .8em;
    text-align: center;
    color: white;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, .4);

    & > i {
        float: left;
        line-height: 16px;
    }
`

const HelperNote = ({ children }) => {
  return (
    <HelperStyle>
      { children }
      <i className='fas fa-info-circle'></i>
    </HelperStyle>
  )
}

export default HelperNote
