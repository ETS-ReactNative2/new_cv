import React from "react";
import ReactMarkdown from "react-markdown";
import styled from "styled-components";

const SidenoteLineStyle = styled.li`
  background-color: #cd201f;
  border: 1px solid white;
  border-radius: 3px;
  padding: 5px;
  margin: 0;
  color: white;
  font-size: 12px;
  height: 100%;
  width: 100%;
  position: relative;

  & > i {
    margin: 0 10px 0 0;
  }

  & > span {
    border: 1px solid green;
    position: relative;
    width: 300px;
  }
`;

const Sidenote = ({ sidenote }) => {
  return (
    <SidenoteLineStyle>
      {/* <i className={sidenote.icon} /> */}
      <span>
        <ReactMarkdown source={sidenote.description} escapeHtml={false} />
      </span>
    </SidenoteLineStyle>
  );
};

export default Sidenote;
