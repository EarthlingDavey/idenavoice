import cookie from 'cookie';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;
const webUrl = process.env.VERCEL_URL
  ? 'https://' + process.env.VERCEL_URL
  : process.env.WEB_URI;
import { getUserByToken } from '../../controllers/auth';

async function processPayload(req, driver) {
  let response = {
    errors: [],
    success: false,
  };
  if (!req.params || !req.params.token) {
    response.errors.push('The request contains no body, token or signature');
    return response;
  }

  // Using the token, query the db to find the nonce that is paired to it.

  return false;
}

export default async (req, res, driver) => {
  if (req.method === 'POST') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({}));
  } else {
    // Handle any other HTTP method
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');

    let session = driver.session();
    const dbUser = await getUserByToken(session, req.params.token);
    session.close();
    console.log({ dbUser });

    if (!dbUser) {
      res.redirect(301, webUrl + '/signup');
    }

    const token = jwt.sign(
      { address: dbUser.address, time: new Date() },
      JWT_SECRET,
      {
        expiresIn: '6h',
      }
    );

    res.setHeader(
      'Set-Cookie',
      cookie.serialize('token', token, {
        httpOnly: true,
        maxAge: 6 * 60 * 60,
        path: '/',
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
      })
    );

    res.redirect(301, webUrl);
  }
};
