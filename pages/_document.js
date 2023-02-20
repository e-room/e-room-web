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

          {/* <link rel="manifest" href="/manifest.json" />
          <link href="/64.png" rel="icon" type="image/png" sizes="16x16" />
          <link href="/64.png" rel="icon" type="image/png" sizes="32x32" />
          <link rel="apple-touch-icon" href="/64.png"></link>
          <meta name="theme-color" content="#53ac8e" /> */}

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
          {/* <script type="module">
            import 'https://cdn.jsdelivr.net/npm/@pwabuilder/pwaupdate'; const el =
            document.createElement('pwa-update'); document.body.appendChild(el);
          </script> */}
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
