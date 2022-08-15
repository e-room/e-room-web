import PropTypes from "prop-types";
import { GlobalStyle } from "../../styles/globalStyle";
import Link from "next/link";
import AppBar from "../AppBar";
import NavBar from "../NavBar";

export default function AppLayout({ children }) {
  return (
    <>
      <GlobalStyle />
      <AppBar />
      {children}
      <NavBar />
    </>
  );
}

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
