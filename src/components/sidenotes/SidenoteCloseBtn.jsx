import React from "react";
import styled from "styled-components";
import devices from "../../utils/devices";

const SidenoteClose = styled.span`
  position: absolute;
  bottom: -10px;
  left: 50%;
  border-radius: 50%;
  padding: 0 5px;
  width: 50px;
  height: 50px;
  background-color: red;
  text-align: center;
  line-height: 25px;
  cursor: pointer;

  @media ${devices.desktop} {
    padding: 0 15px;
    width: 50px;
    height: 50px;
    line-height: 50px;
  }
`;

const SidenoteCloseBtn = ({ handleClick }) => {
  return (
    <SidenoteClose onClick={handleClick}>
      <i className="fas fa-times" />
    </SidenoteClose>
  );
};

export default SidenoteCloseBtn;
