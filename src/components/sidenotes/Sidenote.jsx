import React from "react";
import ReactMarkdown from "react-markdown";
import styled from "styled-components";

const SidenoteLineStyle = styled.li`
  background-color: #cd201f;
  border-radius: 5px;
  padding: 5px;
  margin-bottom: 10px;
  color: white;
  height: auto;
  font-size: 12px;
  position: relative;

  & > i {
    position: absolute;
    top: 10px;
    left: 10px;
    margin: 0;
    padding: 0;
  }

  & > .sidenote {
    & h4 {
      margin: 5px 0px 5px 20px;
    }

    & span {
      padding: 5px;
      background-color: forestgreen;
      color: #000;
      border-radius: 5px;
      position: absolute;
      right: 10px;
      top: 10px;
    }
  }
`;

const Sidenote = ({ sidenote }) => {
  return (
    <SidenoteLineStyle>
      <i className="fas fa-info-circle" />
      <span className="sidenote">
        <ReactMarkdown source={sidenote} escapeHtml={false} />
      </span>
    </SidenoteLineStyle>
  );
};

export default Sidenote;
