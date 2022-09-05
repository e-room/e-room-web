import Head from "next/head";
import PropTypes from "prop-types";
import "../styles/reset.css";
import "../styles/palette.css";
import "react-perfect-scrollbar/dist/css/styles.css";

import { RecoilRoot } from "recoil";

const App = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title>e-room</title>
      </Head>
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    </>
  );
};

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default App;
