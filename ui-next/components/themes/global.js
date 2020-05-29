import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

//  ${reset}
const GlobalStyle = createGlobalStyle`


  /* comfortaa-regular - latin */
  @font-face {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 900;
    src: local(''),
        url('/fonts/inter/Inter-Black.woff') format('woff'); 
  } 
  @font-face {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    src: local(''),
        url('/fonts/inter/Inter-SemiBold.woff') format('woff'); 
  } 
  
  html {
    box-sizing: border-box;
    /* font-size: 16px; */
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {

    /* padding: 0;
    margin: 0; */
    /* Temp. padding/  */
    padding: 0px;
    margin: 0;
    font-size: 100%;
    line-height: 1.4;
    font-family: Inter; 
    font-weight: 600;
    /* font-family: 'xyz';  */
    /* background-color: ${(props) => props.theme.colors.background}; */
  }
  /* button,
  input {  
    font-size: inherit;
    font-family: inherit;
    border: none;
    background-color: transparent;
    color: inherit;
  }
  label,
  button {
    cursor: pointer;
  }
  a {
    text-decoration: none;
    /* color: inherit; */
  }
  img {
    max-width: 100%;
  } */

`;

module.exports = {
  GlobalStyle,
};
