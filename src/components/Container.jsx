import React from 'react'
import styled from 'styled-components'
import devices from '../utils/devices'

const AppStyle = styled.div`
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

const Container = () => {
  return (
    <div>
      
    </div>
  )
}

export default Container
