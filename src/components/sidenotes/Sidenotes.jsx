import React from "react";
import styled from "styled-components";
import sidenotes from "../../utils/sidenotes";
import Sidenote from "./Sidenote";

const SidenotesListStyle = styled.ul`
  margin: 0px;
  padding: 0px;
  overflow: visible;
  height: 400px;
  border: 1px solid green;
  display: block;
`;

const Sidenotes = () => {
  return (
    <SidenotesListStyle>
      {sidenotes.length > 0 &&
        sidenotes.map((sidenote, i) => (
          <Sidenote key={i} sidenote={sidenote} />
        ))}
    </SidenotesListStyle>
  );
};

export default Sidenotes;
