import PropTypes from "prop-types";
import { GlobalStyle } from "../../styles/globalStyle";
import Link from "next/link";
import AppBar from "../AppBar";
import NavBar from "../NavBar";
import styled from "@emotion/styled";

const AppBarWrapper = styled.div`
  box-shadow: 0px -4px 16px 0px rgba(0, 0, 0, 0.04);
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
`;

export default function AppLayout({ children }) {
  return (
    <>
      <GlobalStyle />
      <AppBarWrapper>
        <AppBar />
        {children}
      </AppBarWrapper>
      <NavBar />
    </>
  );
}

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
