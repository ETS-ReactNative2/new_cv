import React from 'react'
import ReactMarkdown from 'react-markdown'
import styled from 'styled-components'
import devices from '../../utils/devices';

const intro = `### Hi, Welcome to my interactive resume  
My name is <span>Believe LODY</span>, I am a web developper based in France. I am a Front End developper but I would rather say that I am a Javascript developper. Indeed, I used to work with tools around Javascript world.  
<span>React JS</span> is my favorite library, so you will find out that most of my work are made with that.
I put a great interest to all packages I can use with react like <span>Styled-components</span>, <span>Semantic-ui-react</span>, <span>Redux</span>, <span>Axios</span>, <span>MQTT-Mosca</span> or <span>React-spring</span>. Please feel free to check my [__github__](https://github.com/believelody).  
I keep in touch new stuff here in web development universe. I improve my skills in backend side with nodejs, mongoDB and the <span>brand new GraphQL</span>.
#### Enjoy your journey in my resume website ; ) !!!
`

const IntroStyle = styled.div`
  border-left: 2px solid #2c3e50;
  padding-left: 10px;
  font-style: oblique;
  font-size: .9em;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, .4);

  a { 
      color: #e74c3c; 
      text-decoration: none;
  }
  
  span { 
      background-color: #2980b9;
      color: white;
      border-radius: 10px;
      padding: 2px 5px;
      font-style: normal;
      font-weight: bold;
      box-shadow: 2px 2px 5px rgba(0, 0, 0, .4);
  }

  @media ${devices.mobileL} {
    font-size: .8em;
  }
`

const Introduction = () => {
  return (
    <IntroStyle>
      <ReactMarkdown source={intro} escapeHtml={false} />
    </IntroStyle>
  )
}

export default Introduction
