import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { neo4jgraphql, cypherQuery, cypherMutation } from 'neo4j-graphql-js';
const { AuthenticationError } = require('apollo-server');

import { getUserByAddress } from '../../controllers/auth';
import { getTagByName, createTagWithUser } from '../../controllers/tags';

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

async function CreateTag(_parent, _args, ctx, _info) {
  // Check to see if the user is allowed to create the tag

  const token = ctx.cookies && ctx.cookies.token ? ctx.cookies.token : null;
  // console.log({ token });
  if (token) {
    try {
      const { address } = jwt.verify(token, JWT_SECRET);
      console.log(address);

      let session = ctx.driver.session();
      // get the user info by address
      const dbUser = await getUserByAddress(session, address);
      // console.log(dbUser);

      if (!dbUser) {
        throw new AuthenticationError(
          'Authentication address is invalid, please log in '
        );
      }
      let dbTag = false;
      const dbExistingTag = await getTagByName(session, _args.name);

      // console.log(dbExistingTag);

      // TODO - create limits based on user status
      // This is the users address, does it have permission?

      if (!dbExistingTag) {
        dbTag = await createTagWithUser(session, _args, address);
      }

      // console.log({ dbTag });

      session.close();
      return dbTag ? dbTag : dbExistingTag;
    } catch (err) {
      console.log(err);
      throw new AuthenticationError(
        'Authentication token is invalid, please log in '
      );
    }
  }
  console.log('no token');
  throw new AuthenticationError(
    'Authentication token is nowhere to be found, please log in '
  );
}

module.exports = {
  CreateTag,
};
