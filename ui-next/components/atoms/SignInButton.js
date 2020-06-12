import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
const querystring = require('querystring');
import Button from './Button';

function SignInButton({ input }) {
  const router = useRouter();

  const [isComponentMounted, setIsComponentMounted] = useState(false);

  useEffect(() => setIsComponentMounted(true), []);

  if (!isComponentMounted) {
    return null;
  }

  const getSessionToken = () =>
    // Generate random session token
    'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c, r) =>
      ('x' == c ? (r = (Math.random() * 16) | 0) : (r & 0x3) | 0x8).toString(16)
    );

  const token = getSessionToken();

  // console.log(getSessionToken());

  function getDnaUrl(token) {
    const siteUrl = process.env.url;
    //Generate url for Idena app
    const queryObject = {
      callback_url: siteUrl + '/auth/v1/callback/' + token,
      token,
      nonce_endpoint: siteUrl + '/auth/v1/start-session',
      authentication_endpoint: siteUrl + '/auth/v1/authenticate',
      favicon_url: '',
    };

    const query = querystring.encode(queryObject);

    const dnaUrl = 'dna://signin/v1?' + query;

    return dnaUrl;
  }

  const dnaUrl = getDnaUrl(token);

  const handleClick = () => {
    router.push('/signin');
  };

  return (
    <a href={dnaUrl} onClick={handleClick}>
      Sign-in
    </a>
  );
}

export default SignInButton;
