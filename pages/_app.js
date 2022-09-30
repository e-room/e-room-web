import Head from "next/head";
import PropTypes from "prop-types";
import "styles/reset.css";
import "styles/palette.css";
import "react-perfect-scrollbar/dist/css/styles.css";

import { RecoilRoot } from "recoil";

const App = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="preconnect" href="https://dapi.kakao.com" />
        <link rel="dns-prefetch" href="https://dapi.kakao.com" />
        {/* 폰트 cdn */}
        <link
          rel="stylesheet"
          as="style"
          // crossorigin
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.5/dist/web/static/pretendard.css"
        />
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
