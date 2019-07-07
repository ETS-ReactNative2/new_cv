import React from 'react'
import styled from 'styled-components'
import Skill from './Skill';
import skills from '../../utils/skills'

const ListStyle = styled.ul`
  list-style: none;
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  overflow: auto;
  z-index: 1;

  & li:last-child {
    border-bottom: none;
  }
`

const Skills = () => {
    return (
        <ListStyle>
            {
                skills.length > 0 && skills.map((skill, i) => (
                    <Skill key={i} item={skill} index={i} />
                ))
            }
        </ListStyle>
    )
}

export default Skills
