import React from 'react'
import AboutList from './AboutList';
import Introduction from './Introduction';
import HelperNote from '../panel/HelperNote';

const About = () => {
  return (
    <React.Fragment>
        <Introduction />
        <HelperNote>
            Here below are some icons you can play by click on each. Try and see what will happen !!
        </HelperNote>
        <AboutList />
    </React.Fragment>
  )
}

export default About
