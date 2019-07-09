import React from 'react'
import styled from 'styled-components'
import Skill from './Skill';
import skills from '../../utils/skills'
import HelperNote from '../panel/HelperNote';

const ListStyle = styled.ul`
    list-style: none;
    width: 100%;
    height: 100%;
    padding: 0;
    margin-top: 10px;
    overflow: auto;
    z-index: 1;
    border-radius: 5px;
    border: 2px solid rgba(0, 0, 0, .2);
    box-shadow: 3px 3px 7px rgba(0, 0, 0, .6);

    & li:last-child {
        border-bottom: none;
    }
`

const Skills = () => {
    return (
        <React.Fragment>
            <HelperNote>
                In list below, click on one line's title to display modal.
                <br />
                Click on each pill to display skill value
            </HelperNote>
            <ListStyle>
                {
                    skills.length > 0 && skills.map((skill, i) => (
                        <Skill key={i} item={skill} index={i} />
                    ))
                }
            </ListStyle>
        </React.Fragment>
    )
}

export default Skills
