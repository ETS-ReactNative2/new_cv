import React from 'react'
import styled from 'styled-components'
import Experience from './Experience';
import experiences from '../../utils/experience'

const ExperiencesStyle = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`

const Experiences = () => {
    const [currentIndex, setIndex] = React.useState(-1)

    return (
        <ExperiencesStyle>
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
