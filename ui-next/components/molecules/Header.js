import Link from 'next/link';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { HeaderStyles } from './HeaderStyles';
import { LogoStyles } from './../atoms/LogoStyles';
import SignInButton from './../atoms/SignInButton';
import { ButtonStyles } from '../atoms/ButtonStyles';
import RoboImg from '../atoms/RoboImg';

const VIEWER_QUERY = gql`
  query ViewerQuery {
    viewer {
      address
    }
  }
`;

const { toUtf8, fromUtf8 } = require('ethereumjs-util');

export default function Header(props) {
  const { client, loading, data } = useQuery(VIEWER_QUERY, {
    fetchPolicy: 'network-only',
  });

  console.log(data);

  return (
    <HeaderStyles ButtonStyles={ButtonStyles}>
      {/* <Logo></Logo> */}
      <div className="left">
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
        </ul>
      </div>
      <div className="right">
        {!loading && data && !data.viewer && <SignInButton></SignInButton>}
        {!loading && data && data.viewer && (
          <>
            <a href="/me" className="profile">
              <RoboImg address={data.viewer.address}></RoboImg>
            </a>
            <a href="/signout">Sign out</a>
          </>
        )}
      </div>
    </HeaderStyles>
  );
}
