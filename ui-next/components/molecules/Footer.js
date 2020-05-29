import Link from 'next/link';
import { FooterStyles } from './FooterStyles';
// import Logo from './../atoms/Logo';
const querystring = require('querystring');

export default function Footer(props) {
  return (
    <FooterStyles>
      <div className="inner">
        <h2>Footer</h2>
        <ul>
          <li>
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          <li>
            <Link href="#ask">
              <a>Ask</a>
            </Link>
          </li>
          <li>
            <Link href="#answer">
              <a>Answer</a>
            </Link>
          </li>
          <li>
            <Link href="#about">
              <a>About</a>
            </Link>
          </li>
        </ul>
      </div>
    </FooterStyles>
  );
}
