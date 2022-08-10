import { Global, css } from "@emotion/react";

export const GlobalStyle = () => {
  return (
    <Global
      styles={css`
        /* custom */
        .container {
          width: 720px;
          /*max-width: 720px;*/

          height: auto;

          padding-left: 20px;
          padding-right: 20px;
          margin: 0 auto;
        }

        @media screen and (max-width: 720px) {
          .container {
            width: 100%;
          }
        }

        .text-center {
          text-align: center;
        }

        /* Color */
        .text-primary-1 {
          color: #53ac8e !important;
        }

        .text-primary-2 {
          color: #77bfa7 !important;
        }

        .text-primary-3 {
          color: #a0d2c1 !important;
        }

        .text-primary-4 {
          color: #bbdfd3 !important;
        }

        .text-primary-5 {
          color: #d6ece5 !important;
        }

        .text-primary-6 {
          color: #f1f9f6 !important;
        }

        .text-black {
          color: #212121 !important;
        }

        .text-gray-1 {
          color: #646464 !important;
        }

        .text-gray-2 {
          color: #909090 !important;
        }

        .text-gray-3 {
          color: #bdbdbd !important;
        }

        .text-gray-4 {
          color: #e9e9e9 !important;
        }

        .text-white {
          color: #ffffff !important;
        }

        .bg-gray {
          background-color: #fafafa !important;
        }

        .bg-translucent {
          background-color: rgba(255, 255, 255, 0.8) !important;
        }

        /* alert 관련 추가하기 */

        /* Effect */
        .nav-shadow {
          box-shadow: 0px -4px 16px 0px rgba(0, 0, 0, 0.04);
        }

        /* Typography */
        * {
          font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto,
            "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR",
            "Malgun Gothic", sans-serif !important;
        }

        .display-1 {
          font-style: normal;
          font-weight: 800;
          font-size: 38px;
          line-height: 52px;
          letter-spacing: 0em;

          color: #212121;
        }

        .display-2 {
          font-style: normal;
          font-weight: 800;
          font-size: 36px;
          line-height: 48px;
          letter-spacing: 0em;

          color: #212121;
        }

        .display-3 {
          font-style: normal;
          font-weight: 800;
          font-size: 36px;
          line-height: 48px;
          letter-spacing: 0em;

          color: #212121;
        }

        .display-4 {
          font-style: normal;
          font-weight: 800;
          font-size: 32px;
          line-height: 40px;
          letter-spacing: 0em;

          color: #212121;
        }

        .title-1 {
          font-style: normal;
          font-weight: 700;
          font-size: 28px;
          line-height: 36px;
          letter-spacing: 0em;

          color: #212121;
        }

        .title-1 {
          font-style: normal;
          font-weight: 700;
          font-size: 28px;
          line-height: 36px;
          letter-spacing: 0em;

          color: #212121;
        }

        .title-2 {
          font-style: normal;
          font-weight: 700;
          font-size: 26px;
          line-height: 32px;
          letter-spacing: 0em;

          color: #212121;
        }

        .title-3 {
          font-style: normal;
          font-weight: 700;
          font-size: 24px;
          line-height: 28px;
          letter-spacing: 0em;

          color: #212121;
        }

        .subtitle-1 {
          font-style: normal;
          font-weight: 700;
          font-size: 20px;
          line-height: 28px;
          letter-spacing: 0em;

          color: #212121;
        }

        .subtitle-2 {
          font-style: normal;
          font-weight: 700;
          font-size: 18px;
          line-height: 24px;
          letter-spacing: 0em;

          color: #212121;
        }

        .body-1 {
          font-style: normal;
          font-weight: 400;
          font-size: 18px;
          line-height: 24px;
          letter-spacing: 0em;

          color: #212121;
        }

        .body-2 {
          font-style: normal;
          font-weight: 400;
          font-size: 16px;
          line-height: 24px;
          letter-spacing: 0em;

          color: #212121;
        }

        .body-3 {
          font-style: normal;
          font-weight: 400;
          font-size: 14px;
          line-height: 20px;
          letter-spacing: 0em;

          color: #212121;
        }

        .body-bold-1 {
          font-style: normal;
          font-weight: 700;
          font-size: 18px;
          line-height: 24px;
          letter-spacing: 0em;

          color: #212121;
        }

        .body-bold-2 {
          font-style: normal;
          font-weight: 700;
          font-size: 16px;
          line-height: 24px;
          letter-spacing: 0em;

          color: #212121;
        }

        .body-bold-3 {
          font-style: normal;
          font-weight: 700;
          font-size: 14px;
          line-height: 20px;
          letter-spacing: 0em;

          color: #212121;
        }

        .caption-1 {
          font-style: normal;
          font-weight: 400;
          font-size: 14px;
          line-height: 20px;
          letter-spacing: 0em;

          color: #212121;
        }

        .caption-2 {
          font-style: normal;
          font-weight: 400;
          font-size: 12px;
          line-height: 16px;
          letter-spacing: 0em;

          color: #212121;
        }

        .caption-bold-1 {
          font-style: normal;
          font-weight: 600;
          font-size: 14px;
          line-height: 20px;
          letter-spacing: 0em;

          color: #212121;
        }

        .caption-bold-2 {
          font-style: normal;
          font-weight: 600;
          font-size: 12px;
          line-height: 16px;
          letter-spacing: 0em;

          color: #212121;
        }
      `}
    />
  );
};