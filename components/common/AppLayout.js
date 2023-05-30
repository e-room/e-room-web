import PropTypes from "prop-types";
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
  margin-top: 44px;
  ${(p) => p.enabledNavbar && "margin-bottom: 44px"};

  @media (min-width: 720px) {
    margin: 44px auto;
    max-width: 720px;
  }
`;
