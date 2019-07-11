import React from "react";
import styled from "styled-components";
import devices from "../../utils/devices";

const TooltipStyle = styled.span`
  position: absolute;
  top: -8%;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 5px;
  color: white;
  border: 2px solid darkgreen;
  background-color: white;
  color: black;

  @media ${devices.mobileL} {
    top: -1%;
    font-size: 0.6em;

    @media (orientation: landscape) {
      visibility: hidden;
    }
  }
`;

const Tooltip = ({ children }) => {
  return <TooltipStyle>{children}</TooltipStyle>;
};

export default Tooltip;
