import React from "react";
import ReactMarkdown from "react-markdown";
import styled from "styled-components";

const SidenoteLineStyle = styled.li`
  background-color: #cd201f;
  border-radius: 5px;
  padding: 5px;
  margin: 0;
  color: white;
  height: auto;
  font-size: 12px;
  position: relative;
  overflow: hidden;

  & i {
    margin: 0 10px 0 0;
  }

  & span {
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
