import { createUser } from '../../controllers/auth';

async function processPayload(req, driver) {
  let response = {
    errors: [],
    success: false,
  };
  if (!req.body || !req.body.token || !req.body.address) {
    response.errors.push('The request contains no body, token or address');
    return response;
  }

  // Generate a nonce for this token
  const nonceRandom = () =>
    // Generate random session token
    'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c, r) =>
      ('x' == c ? (r = (Math.random() * 16) | 0) : (r & 0x3) | 0x8).toString(16)
    );

  let user = {
    address: req.body.address,
    token: req.body.token,
    nonce: 'signin-' + (await nonceRandom()),
  };

  let session = driver.session();
  const newUser = await createUser(session, user);
  console.log(newUser);
  session.close();

  // save the nonce and token pair in the database

  if (!newUser.nonce || newUser.nonce !== user.nonce) {
    response.errors.push('could not create user in db');
  }

  if (0 !== response.errors.length) {
    return response;
  }
  delete response.errors;
  response.success = true;
  // Respond with a nonce
  response.data = {
    nonce: user.nonce,
  };
  return response;
}

export default async (req, res, driver) => {
  // console.log(driver);
  if (req.method === 'POST') {
    // let newRes = data.map((res) =>
    //   Object.assign({}, item, { selected: false })
    // );
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
