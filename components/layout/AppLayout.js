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
      {/* //TODO : map 페이지에 scroll 들어가는거 숨기기 임시조치!!!! */}
      {appBarObject?.rightIcon === "search" ? (
        children
      ) : (
        <ScrollContent>{children}</ScrollContent>
      )}
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
