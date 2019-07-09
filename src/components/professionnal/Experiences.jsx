import React from 'react'
import styled from 'styled-components'
import Experience from './Experience';
import experiences from '../../utils/experience'
import HelperNote from '../panel/HelperNote';

const ExperiencesStyle = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`

const Experiences = () => {
    const [currentIndex, setIndex] = React.useState(-1)

    return (
        <ExperiencesStyle>
            <HelperNote>
                Here you have to click on one line to dropdown content. Another click brings things back
            </HelperNote>
            {
                experiences.length > 0 && experiences.map((exp, i) => (
                    <Experience
                        key={i}
                        currentIndex={currentIndex}
                        setIndex={setIndex}
                        item={exp}
                        index={i} 
                    />
                ))
            }
        </ExperiencesStyle>
    )
}

export default Experiences
