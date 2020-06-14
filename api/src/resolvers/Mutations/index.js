// import dotenv from 'dotenv';
// import cookie from 'cookie';
// import jwt from 'jsonwebtoken';
// const { AuthenticationError } = require('apollo-server');
import { neo4jgraphql, cypherQuery, cypherMutation } from 'neo4j-graphql-js';
// import { createQuestionUserRelationship } from '../controllers/question';
// import { getUserByAddress } from '../controllers/auth';
const { CreateTag } = require('./CreateTag');
const { CreateAction } = require('./CreateAction');
const { CreateMyTagUpVotes } = require('./CreateMyTagUpVotes');
const { signOut } = require('./signOut');

// dotenv.config();
// const JWT_SECRET = process.env.JWT_SECRET;

const Mutation = {
  signOut,
  CreateTag,
  CreateAction,
  CreateMyTagUpVotes,
  async DeleteAllTags(object, params, ctx, resolveInfo) {
    // console.log(process.env);
    if ('develop' === process.env.NODE_ENV) {
      return neo4jgraphql(object, params, ctx, resolveInfo);
    }
    throw new AuthenticationError(
      'Authentication token is invalid, please log in '
    );
    return false;
  },
  async DeleteAllActions(object, params, ctx, resolveInfo) {
    // console.log(process.env);
    if ('develop' === process.env.NODE_ENV) {
      return neo4jgraphql(object, params, ctx, resolveInfo);
    }
    throw new AuthenticationError(
      'Authentication token is invalid, please log in '
    );
    return false;
  },
  // async CreateQuestion(object, params, ctx, resolveInfo) {
  //   console.log(params);
  //   // force false. Only change to true when backend service has confirmed it
  //   params.onChain = false;
  //   const token = 1;
  //   // const token = ctx.cookies && ctx.cookies.token ? ctx.cookies.token : null;
  //   if (token) {
  //     console.log('hi2');
  //     try {
  //       console.log('hi3');
  //       const address = '0x21ac9c3ac3e9415dc82f461e94728835f170a1f4';
  //       // const { address } = jwt.verify(token, JWT_SECRET);
  //       console.log(address);
  //       if (address) {
  //         const question = await neo4jgraphql(
  //           object,
  //           params,
  //           ctx,
  //           resolveInfo,
  //           true
  //         );
  //         console.log(question);
  //         // link question to user here
  //         let session = ctx.driver.session();
  //         const user = await createQuestionUserRelationship(
  //           session,
  //           question.question,
  //           address
  //         );
  //         console.log(user);
  //         session.close();
  //         return question;
  //       }
  //       question;
  //     } catch (err) {
  //       console.log('hi4');
  //       throw new AuthenticationError(
  //         'Authentication token is invalid, please log in '
  //       );
  //     }
  //   }
  //   return null;
  // },
};

module.exports = Mutation;
