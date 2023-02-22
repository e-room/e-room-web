import PropTypes from "prop-types";
import "styles/reset.css";
import "styles/palette.css";

import { RecoilRoot } from "recoil";
import { useEffect } from "react";

const App = ({ Component, pageProps }) => {
  function setScreenSize() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }
  useEffect(() => {
    setScreenSize();
  });

  return (
    <RecoilRoot>
      <title>e-room</title>

      <Component {...pageProps} />
    </RecoilRoot>
  );
};

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default App;
