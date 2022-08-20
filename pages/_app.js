import Head from "next/head";
import PropTypes from "prop-types";
import "../styles/reset.css";
import "../styles/palette.css";
import { useState, createContext } from "react";

export const GlobalContext = createContext("");

const App = ({ Component, pageProps }) => {
  const [isLogin, setIsLogin] = useState(false);
  const value = {
    isLogin,
    setIsLogin,
  };

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title>e-room</title>
      </Head>
      <GlobalContext.Provider value={value}>
        <Component {...pageProps} />
      </GlobalContext.Provider>
    </>
  );
};

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default App;
