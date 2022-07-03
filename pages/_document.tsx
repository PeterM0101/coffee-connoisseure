import Document, {
  DocumentContext,
  DocumentInitialProps,
  Html,
  Head,
  Main,
  NextScript,
} from "next/document";

class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);

    return initialProps;
  }

  render() {
    return (
      // <link rel="preload" href="font.woff2" as="font" type="font/woff2" crossOrigin>
      <Html lang={"en"}>
        <Head>
          <link
            rel="preload"
            href={"/fonts/IBM_Plex_Sans/IBMPlexSans-Bold.ttf"}
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href={"/fonts/IBM_Plex_Sans/IBMPlexSans-Regular.ttf"}
            as="font"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href={"/fonts/IBM_Plex_Sans/IBMPlexSans-SemiBold.ttf"}
            as="font"
            crossOrigin="anonymous"
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
