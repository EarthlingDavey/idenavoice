import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { neo4jgraphql, cypherQuery, cypherMutation } from 'neo4j-graphql-js';
const { AuthenticationError } = require('apollo-server');

import { getUserByAddress } from '../../controllers/auth';
import {
  getTagByName,
  createTagWithUser,
  tagsToRecount,
  updateTagCount,
} from '../../controllers/tags';
import {
  getTagAction,
  creatUpdateTagAction,
  removeTagActions,
  batchCreateTagActions,
} from '../../controllers/actions';

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

function duplicateTagIds(actions) {
  let tagIds = [];

  for (let i = 0; i < actions.length; i++) {
    const a = actions[i];
    if (tagIds.includes(a.tagId)) {
      return true;
    }
    tagIds.push(a.tagId);
  }
  return false;
}

function spareCredits(actions) {
  let spareVoteCredits = 100;

  for (let i = 0; i < actions.length; i++) {
    const a = actions[i];
    spareVoteCredits = spareVoteCredits - (a.qty ? Math.pow(a.qty, 2) : 1);
  }
  return spareVoteCredits;
}

async function CreateMyTagUpVotes(_parent, args, ctx, _info) {
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
      console.log(dbUser);

      if (!dbUser) {
        throw new AuthenticationError(
          'Authentication address is invalid, please log in '
        );
        return;
      }

      if (duplicateTagIds(args.actions)) {
        console.log('votes for same tag twice');
        return [];
      }

      const mySpareCredits = spareCredits(args.actions);
      console.log(mySpareCredits);

      console.log(args);

      // check to see if the up-votes are valid, do they add up to 100?
      if (mySpareCredits < 0) {
        // return an error if not valid
        console.log('invalid credit total');
        return [];
      }

      // if valid, then delete the current tag actions for this user

      const dbRemovedActions = await removeTagActions(session, address);
      // console.log(dbRemovedActions);

      // then create the tag actions from the query

      const dbActions = await batchCreateTagActions(
        session,
        address,
        args.actions
      );

      // console.log('a user has just updated their tag votes');

      // we need to set some orders on the tags
      // todo remove await and close session after promise is returned
      const tags = await tagsToRecount(dbActions, dbRemovedActions);
      // console.log(tags);

      for (let i = 0; i < tags.length; i++) {
        const dbTag = await updateTagCount(session, tags[i].tagId);
        // console.log('dbTag:');
        console.log(dbTag);
      }

      session.close();
      // let payload = {};
      // let payload = dbAction;
      // payload.user = dbUser;

      // console.log(payload);

      return dbActions;
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
  CreateMyTagUpVotes,
};
