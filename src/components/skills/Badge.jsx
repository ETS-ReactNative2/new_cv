import React from 'react'
import styled from 'styled-components'
import devices from '../../utils/devices'

const BadgeStyle = styled.span`
  height: 25px;
  width: 70px;
  background-color: cadetblue;
  margin: 0 10px 10px;
  padding: 3px 5px;
  position: relative;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 3px 2px 4px rgba(0, 0, 0, .4);

  @media ${devices.desktop} {
    width: 170px;
    height: 40px;
    border-radius: 15px;
    margin: 20px;
    padding: 10px 15px;
  }
`

const BadgeName = styled.span`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: transparent;
  color: white;
  position: absolute;
  top: ${props => props.isShowed ? -30 : 50}%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: top 700ms;
  z-index: 2;

  & span {
    text-align: center;
  }

    @media ${devices.desktop} {
        top: ${props => props.isShowed ? -50 : 50}%;
    }
`

const BadgeValue = styled.span`
  height: 100%;
  width: ${props => props.value}%;
  background-color: ${props => props.color};
  position: absolute;
  top: 0px;
  left: 0px;
  z-index: 1;
  transition: width ${props => props.duration}ms ease, background-color 1500ms;
`

const Badge = ({ obj }) => {
    let interval = null
    const duration = 3000
    const { name, percent } = obj

    const badgeRef = React.useRef()
    const [value, setValue] = React.useState(0)
    const [color, setColor] = React.useState('red')
    const [isValueShowed, showValue] = React.useState(false)

    const updateValue = () => {
        let step = duration / percent
        interval = setInterval(() => {
            setValue(v => v + 1)
        }, step)
    }

    const updateColor = () => {
        if (value >= 75)
            setColor('forestgreen')
        else if (value >= 50 && value < 75)
            setColor('darkorange')
        else if (value >= 25 && value < 50)
            setColor('gold')
        else if (value < 25)
            setColor('crimson')
    }

    React.useEffect(() => {  
        if (value === percent) {
            clearInterval(interval)
        }
        else {
            updateValue()
        }
        updateColor()

        return () => clearInterval(interval)
    }, [value])

    return (
        <BadgeStyle ref={badgeRef}>
            <BadgeValue duration={duration} color={color} value={value} />
            <BadgeName
                isShowed={isValueShowed}
                onClick={() => showValue(!isValueShowed)}>
                <span>{name}</span>
                <span>{value}%</span>
            </BadgeName>
        </BadgeStyle>
    )
}

export default Badge
