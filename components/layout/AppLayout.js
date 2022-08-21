import PropTypes from "prop-types";
import { GlobalStyle } from "../../styles/globalStyle";
import AppBar from "../AppBar";
import NavBar from "../NavBar";

export default function AppLayout({ children }) {
  // TODO: scroll이 contents 영역에서만 동작되게 수정
  return (
    <>
      <GlobalStyle />
      <AppBar />
      <div style={{ overflow: "scroll", height: 725 }}>{children}</div>
      <NavBar />
    </>
  );
}

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
