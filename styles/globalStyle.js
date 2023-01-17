import { Global, css } from "@emotion/react";
const globalStyle = css`
  /* Typography */
  * {
    font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto,
      "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic",
      sans-serif !important;
  }

  .body-3 {
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0em;

    color: #212121;
  }
`;
export const GlobalStyle = () => {
  return <Global styles={globalStyle} />;
};
