import React, { useRef, useEffect } from 'react'
import styled from 'styled-components'

const BtnStyle = styled.div`
    position: fixed;
    bottom: 10px;
    right: 10px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: red;
    display: flex;
    justify-content: center;
    align-items center;
    color: white;
`

const SidenoteBtn = () => {
    const btnRef = useRef()
    return (
        <BtnStyle>
        <span ref={btnRef}><i className='fas fa-comment-dots'></i></span>
        </BtnStyle>
    )
}

export default SidenoteBtn
