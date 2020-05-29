import Head from './Head';
import { ThemeProvider } from 'styled-components';

// import withNProgress from '../lib/withNProgress';
import SiteLayout from './templates/SiteLayout';

import { StyledToastContainer } from '../components/atoms/Toast';

import darkTheme from './themes/dark';
import lightTheme from './themes/light';

// TODO - client and server safe way to get and set darkmode state
// https://www.apollographql.com/docs/react/data/local-state/

const App = ({ children }) => {
  return (
    <ThemeProvider theme={lightTheme}>
      <Head />
      <SiteLayout>{children}</SiteLayout>
      <StyledToastContainer
        position="top-right"
        autoClose={30000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </ThemeProvider>
  );
};

// const msDelay = 200;
// const options = { trickleSpeed: 50 };
export default App;
// export default withNProgress(msDelay, options)(App);
