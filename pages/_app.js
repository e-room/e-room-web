import PropTypes from "prop-types";
import "styles/reset.css";
import "styles/palette.css";
import "react-perfect-scrollbar/dist/css/styles.css";

import { SessionProvider } from "next-auth/react";
import { RecoilRoot } from "recoil";

const App = ({ Component, pageProps }) => {
  return (
    <RecoilRoot>
      <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />
      </SessionProvider>
    </RecoilRoot>
  );
};

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default App;
