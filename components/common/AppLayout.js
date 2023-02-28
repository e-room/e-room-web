import PropTypes from "prop-types";
import { GlobalStyle } from "../../styles/globalStyle";
import styled from "@emotion/styled";
import Header from "../common/Header";
import Footer from "../common/Footer";
import { useRouter } from "next/router";

export default function AppLayout(props) {
  const {
    pageTitle,
    enabledNavbar = true,
    additionalFunction,
    children,
  } = props;

  const router = useRouter();

  return (
    <>
      <GlobalStyle />
      <Header pageTitle={pageTitle} additionalFunction={additionalFunction} />
      {router.asPath === "/" ? (
        children
      ) : (
        <MainContent enabledNavbar={enabledNavbar}>{children}</MainContent>
      )}
      <Footer enabled={enabledNavbar} />
    </>
  );
}

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

const MainContent = styled.div`
  margin: ${(p) => (p.enabledNavbar ? "44px 0" : "44px 0px 0px 0px")};
  @media (min-width: 720px) {
    margin: 44px auto;
    max-width: 720px;
    overflow: hidden;
  }
`;
