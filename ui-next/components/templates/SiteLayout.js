// components/Layout.js

import Header from '../molecules/Header';
import Footer from '../molecules/Footer';
// import Footer from '../organisms/Footer';
import Textarea from '../atoms/Textarea';

const Layout = (props) => (
  <div>
    <Header />
    <main>{props.children}</main>
    {/* <Footer /> */}
  </div>
);

export default Layout;
