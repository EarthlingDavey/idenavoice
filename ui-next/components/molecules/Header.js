import Link from 'next/link';
import { HeaderStyles } from './HeaderStyles';
import { LogoStyles } from './../atoms/LogoStyles';
import SignInButton from './../atoms/SignInButton';
const { toUtf8, fromUtf8 } = require('ethereumjs-util');

export default function Header(props) {
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
        {/* <li>
          {' '}
          <SignInButton></SignInButton>
        </li> */}
        {/* <li>
          <Link href="/signout">
            <a>Sign out</a>
          </Link>
        </li> */}
      </ul>
      <div style={{ display: 'none' }}>
        <SignInButton></SignInButton>
      </div>
    </HeaderStyles>
  );
}
