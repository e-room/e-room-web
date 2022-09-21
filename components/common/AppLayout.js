import PropTypes from "prop-types";
import { GlobalStyle } from "../../styles/globalStyle";
import styled from "@emotion/styled";
import Header from "../common/Header";
import Footer from "../common/Footer";

export default function AppLayout({ appBarObject, children }) {
  return (
    <>
      <GlobalStyle />
      <Header {...appBarObject} />
      <MainContent>{children}</MainContent>
      <Footer />
    </>
  );
}

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

const MainContent = styled.div`
  margin: 56px 0;
`;
