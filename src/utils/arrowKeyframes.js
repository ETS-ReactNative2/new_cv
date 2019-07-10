import { keyframes, css } from 'styled-components'

export const arrowToLeft = keyframes`
    50% { opacity: 1; }
    100% {
        opacity: 0;
        transform: translateX(10px);
    }
`

export const arrowToRight = keyframes`
    50% { opacity: 1; }
    100% {
        opacity: 0;
        transform: translateX(-10px);
    }
`

// export const arrowAnimate = (direction, duration, delay) => css`animation: ${direction === 'left' ? arrowToLeft : arrowToRight} ${duration}ms ${delay}ms ease-in infinite;`