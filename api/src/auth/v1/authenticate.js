import {
  bufferToHex,
  ecrecover,
  fromRpcSig,
  keccak256,
  pubToAddress,
  rlp,
} from 'ethereumjs-util';
import cookie from 'cookie';
import jwt from 'jsonwebtoken';

import {
  getUserByToken,
  createUserWithTokenAndNonce,
} from '../../controllers/auth';

async function processPayload(req, driver) {
  let response = {
    errors: [],
    success: false,
  };
  if (!req.body || !req.body.token || !req.body.signature) {
    response.errors.push('The request contains no body, token or signature');
    return response;
  }

  // Using the token, query the db to find the nonce that is paired to it.
  let session = driver.session();
  const dbUser = await getUserByToken(session, req.body.token);
  session.close();
  // console.log({ dbUser });

  const nonce = dbUser.nonce;
  const signature = req.body.signature;

  let addr;

  try {
    const nonceHash = await keccak256(rlp.encode(nonce));
    const { v, r, s } = await fromRpcSig(signature);
    // console.log({ v });
    const pubKey = await ecrecover(nonceHash, v, r, s);
    const addrBuf = await pubToAddress(pubKey);
    addr = await bufferToHex(addrBuf);
  } catch (error) {
    // console.log(1);
    // console.log(error.message);
    response.errors.push(error.message);
  } finally {
    if (0 !== response.errors.length) {
      return response;
    }
    delete response.errors;
    response.success = true;
    response.data = {
      authenticated: false,
    };
    if (addr === dbUser.address) {
      response.data.authenticated = true;
      // The user is authe'd set a cookie jwt and/or uprate the db here
      //
      //

      // const token = jwt.sign({ addr, time: new Date() }, JWT_SECRET, {
      //   expiresIn: '6h',
      // });

      // context.res.setHeader(
      //   'Set-Cookie',
      //   cookie.serialize('token', token, {
      //     httpOnly: true,
      //     maxAge: 6 * 60 * 60,
      //     path: '/',
      //     sameSite: 'lax',
      //     secure: process.env.NODE_ENV === 'production',
      //   })
      // );

      //
      //
      //
    }
    return response;
  }
}

export default async (req, res, driver) => {
  if (req.method === 'POST') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    const response = await processPayload(req, driver);
    res.end(JSON.stringify(response));
  } else {
    // Handle any other HTTP method
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({}));
  }
};
