import PropTypes from "prop-types";
import Header from "components/common/Header";
import Footer from "components/common/Footer";
import { useRouter } from "next/router";

export default function AppLayout(props) {
  const {
    pageTitle,
    enabledNavbar = true,
    enabledHeader = true,
    additionalFunction,
    children,
  } = props;

  const router = useRouter();

  return (
    <>
      <Header
        pageTitle={pageTitle}
        additionalFunction={additionalFunction}
        enabled={enabledHeader}
      />
      {router.asPath === "/" ? (
        children
      ) : (
        <div
          className={`${enabledNavbar && "mb-[44px]"} ${
            enabledHeader && "mt-[44px]"
          } md:mt-[44px] md:mx-auto md:max-w-[720px]`}
          enabledNavbar={enabledNavbar}
          enabledHeader={enabledHeader}
        >
          {children}
        </div>
      )}
      <Footer enabled={enabledNavbar} />
    </>
  );
}

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
