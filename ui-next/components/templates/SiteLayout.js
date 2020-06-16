// components/Layout.js

import Header from '../molecules/Header';
import Footer from '../molecules/Footer';
// import Footer from '../organisms/Footer';
import Textarea from '../atoms/Textarea';

import styled, { css } from 'styled-components';

const MainStyles = styled.main`
  position: relative;
  z-index: 2;
  background-color: #fff;
  border-bottom: 7px solid #000;
  box-shadow: 25px 25px 0px 0px #ddd;
  min-height: 75vh;
`;

// console.log(process.env.ENV);

const Layout = (props) => (
  <div>
    <Header />
    <MainStyles>{props.children}</MainStyles>
    {process.env.ENV === 'development' && <Footer />}
  </div>
);

export default Layout;
