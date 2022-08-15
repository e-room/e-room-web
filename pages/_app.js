import Head from "next/head";
import PropTypes from "prop-types";
import "../styles/palette.css";
import { useState, createContext } from "react";

export const GlobalContext = createContext("");

const App = ({ Component }) => {
  const [isLogin, setIsLogin] = useState(false);
  const value = {
    isLogin,
    setIsLogin,
  };
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>e-room</title>
      </Head>
      <GlobalContext.Provider value={value}>
        <Component />
      </GlobalContext.Provider>
    </>
  );
};

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default App;
