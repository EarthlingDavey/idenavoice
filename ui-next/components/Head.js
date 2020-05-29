import Head from 'next/head';
import { DefaultSeo } from 'next-seo';
import SEO from '../next-seo';

// import your default seo configuration
// import withNProgress from '../lib/withNProgress';

import { GlobalStyle } from './themes/global';

// TODO - client and server safe way to get and set darkmode state
// https://www.apollographql.com/docs/react/data/local-state/

const App = ({ children }) => {
  return (
    <>
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicons/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicons/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicons/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicons/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/favicons/safari-pinned-tab.svg"
          color="#5bbad5"
        />
        <link rel="shortcut icon" href="/favicons/favicon.ico" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta
          name="msapplication-config"
          content="/favicons/browserconfig.xml"
        />
        <meta name="theme-color" content="#ffffff"></meta>
      </Head>
      <GlobalStyle />
      <DefaultSeo {...SEO} />
    </>
  );
};

// const msDelay = 200;
// const options = { trickleSpeed: 50 };
export default App;
// export default withNProgress(msDelay, options)(App);
