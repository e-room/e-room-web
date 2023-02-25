import { Global, css } from "@emotion/react";
const globalStyle = css`
  /* Typography */
  * {
    font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui,
      Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo",
      "Noto Sans KR", "Malgun Gothic", sans-serif !important;
  }
  :root {
    --vh: 100%;
  }

  .cursor-pointer {
    cursor: pointer !important;
  }
`;
export const GlobalStyle = () => {
  return <Global styles={globalStyle} />;
};
