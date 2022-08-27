import PropTypes from "prop-types";
import { GlobalStyle } from "../../styles/globalStyle";
import styled from "@emotion/styled";
import AppBar from "../AppBar";
import NavBar from "../NavBar";

export default function AppLayout({ appBarObject, children }) {
  return (
    <>
      <GlobalStyle />
      <AppBar {...appBarObject} />
      <ScrollContent>{children}</ScrollContent>
      <NavBar />
    </>
  );
}

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

const ScrollContent = styled.div`
  overflow: scroll;
  height: calc(100vh - 112px);
`;
