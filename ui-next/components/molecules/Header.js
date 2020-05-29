import Link from 'next/link';
import { HeaderStyles } from './HeaderStyles';
import { LogoStyles } from './../atoms/LogoStyles';
const querystring = require('querystring');
const { toUtf8, fromUtf8 } = require('ethereumjs-util');

export default function Header(props) {
  // const getSessionToken = () =>
  //   // Generate random session token
  //   'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c, r) =>
  //     ('x' == c ? (r = (Math.random() * 16) | 0) : (r & 0x3) | 0x8).toString(16)
  //   );

  // const token = getSessionToken();

  // console.log(getSessionToken());

  // const siteUrl = process.env.url ? process.env.url : 'http://localhost:3000';

  // function getDnaUrl(token, siteUrl, callbackUrl) {
  //   //Generate url for Idena app

  //   const queryObject = {
  //     callback_url: siteUrl + '/auth/v1/callback/' + token,
  //     token,
  //     nonce_endpoint: siteUrl + '/auth/v1/start-session',
  //     authentication_endpoint: siteUrl + '/auth/v1/authenticate',
  //   };

  //   const query = querystring.encode(queryObject);

  //   const dnaUrl = 'dna://signin/v1?' + query;

  //   return dnaUrl;
  // }

  // const dnaUrl = getDnaUrl(token, siteUrl, siteUrl);

  return (
    <HeaderStyles>
      {/* <Logo></Logo> */}
      <h1>
        <Link href="/">
          <a>
            <LogoStyles></LogoStyles>idenavoice.com
          </a>
        </Link>
      </h1>
      <ul>
        <li>
          <Link href="/#ask">
            <a>Ask</a>
          </Link>
        </li>
        <li>
          <Link href="/#answer">
            <a>Answer</a>
          </Link>
        </li>
        <li>
          <Link href="/#about">
            <a>About</a>
          </Link>
        </li>
        {/* <li>
          <Link href="#about">
            <a>About</a>
          </Link>
        </li> */}
        {/* <li> <a href={dnaUrl}>Signin with idena</a> </li>
        <li>
          <Link href="/signout">
            <a>Sign out</a>
          </Link>
        </li>*/}
      </ul>
    </HeaderStyles>
  );
}
