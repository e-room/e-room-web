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
      <MainContent>{children}</MainContent>
      <NavBar />
    </>
  );
}

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

const MainContent = styled.div`
  margin: 56px 0;
`;
