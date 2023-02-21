import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <meta charSet="utf-8" />
          <link rel="manifest" href="/manifest.json" />
          <link
            href="images/favicons/favicon-16x16.png"
            rel="icon"
            type="image/png"
            sizes="16x16"
          />
          <link
            href="images/favicons/favicon-32x32.png"
            rel="icon"
            type="image/png"
            sizes="32x32"
          />
          <link
            rel="apple-touch-icon"
            href="images/icons/icon-192x192.png"
          ></link>
          <meta name="msapplication-TileColor" content="#53ac8e"></meta>

          <link
            rel="apple-touch-startup-image"
            href="images/splashscreens/iphone5_splash.png"
            media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
          ></link>
          <link
            rel="apple-touch-startup-image"
            href="images/splashscreens/iphone6_splash.png"
            media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
          ></link>
          <link
            rel="apple-touch-startup-image"
            href="images/splashscreens/iphoneplus_splash.png"
            media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
          ></link>
          <link
            rel="apple-touch-startup-image"
            href="images/splashscreens/iphonex_splash.png"
            media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
          ></link>
          <link
            rel="apple-touch-startup-image"
            href="images/splashscreens/ipad_splash.png"
            media="(min-device-width: 768px) and (max-device-width: 1024px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait)"
          ></link>
          <link
            rel="apple-touch-startup-image"
            href="images/splashscreens/ipadpro1_splash.png"
            media="(min-device-width: 834px) and (max-device-width: 834px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait)"
          ></link>
          <link
            rel="apple-touch-startup-image"
            href="images/splashscreens/ipadpro2_splash.png"
            media="(min-device-width: 1024px) and (max-device-width: 1024px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait)"
          ></link>

          {/* <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          /> */}
          <link rel="preconnect" href="https://dapi.kakao.com" />
          <link rel="dns-prefetch" href="https://dapi.kakao.com" />
          {/* 폰트 cdn */}
          <link
            rel="stylesheet"
            as="style"
            // crossorigin
            href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.5/dist/web/static/pretendard.css"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
