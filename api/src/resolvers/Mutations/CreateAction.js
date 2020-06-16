import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { neo4jgraphql, cypherQuery, cypherMutation } from 'neo4j-graphql-js';
const { AuthenticationError } = require('apollo-server');

import { getUserByAddress } from '../../controllers/auth';
import { getTagByName, createTagWithUser } from '../../controllers/tags';
import { getTagAction, creatUpdateTagAction } from '../../controllers/actions';

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

async function CreateAction(_parent, args, ctx, _info) {
  // Check to see if the user is allowed to create the tag

  const token = ctx.cookies && ctx.cookies.token ? ctx.cookies.token : null;
  // console.log({ token });
  if (token) {
    try {
      const { address } = jwt.verify(token, JWT_SECRET);
      // console.log(address);

      let session = ctx.driver.session();
      // get the user info by address
      const dbUser = await getUserByAddress(session, address);
      // console.log(dbUser);

      if (!dbUser) {
        throw new AuthenticationError(
          'Authentication address is invalid, please log in '
        );
        return;
      }

      // There can only be one user--action--tag

      // from address and tag id, do a merge query for the action

      // this should be update quantity
      let dbAction = await getTagAction(
        session,
        args.data.tagId,
        address,
        args.data.name
      );

      // console.log(dbAction);

      if (!dbAction) {
        dbAction = await creatUpdateTagAction(
          session,
          args.data.tagId,
          address,
          args.data.name,
          args.data.qty ? args.data.qty : 1
        );
      }

      // return null;

      // console.log(dbAction);

      session.close();
      // let payload = {};
      let payload = dbAction;
      payload.user = dbUser;

      console.log(payload);

      return payload;
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
  CreateAction,
};
