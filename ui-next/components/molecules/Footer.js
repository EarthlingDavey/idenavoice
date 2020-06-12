import React, { useState, useEffect, useRef } from 'react';

import Link from 'next/link';

import { FooterStyles } from './FooterStyles';
import { StatusList } from '../atoms/StatusList';
import { throttle } from '../../lib/utils';

export default () => {
  const [height, setHeight] = useState(0);
  const ref = useRef(null);

  const handleResize = throttle(() => {
    setHeight(ref.current.clientHeight);
  }, 1000);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <FooterStyles height={height}>
      <div ref={ref} className="wrap">
        <div className="inner">
          <h2>Status</h2>
          {/* <StatusList></StatusList> */}
          {/* <h2>Footer</h2>
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
          </ul> */}
        </div>
      </div>
      <div className="dummy"></div>
    </FooterStyles>
  );
};
