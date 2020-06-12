import { neo4jgraphql, cypherQuery } from 'neo4j-graphql-js';
import cookie from 'cookie';
import jwt from 'jsonwebtoken';
const { AuthenticationError } = require('apollo-server');
import dotenv from 'dotenv';
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;
const { serverStatus } = require('../status');

// Returns a function, that, when invoked, will only be triggered at most once
// during a given window of time. Normally, the throttled function will run
// as much as it can, without ever going more than once per `wait` duration;
// but if you'd like to disable the execution on the leading edge, pass
// `{leading: false}`. To disable execution on the trailing edge, ditto.
function throttle(func, wait, options) {
  var context, args, result;
  var timeout = null;
  var previous = 0;
  if (!options) options = {};
  var later = function () {
    previous = options.leading === false ? 0 : Date.now();
    timeout = null;
    result = func.apply(context, args);
    if (!timeout) context = args = null;
  };
  return function () {
    var now = Date.now();
    if (!previous && options.leading === false) previous = now;
    var remaining = wait - (now - previous);
    context = this;
    args = arguments;
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
    return result;
  };
}

const Query = {
  async viewer(_parent, _args, context, _info) {
    console.log('viewer');
    // console.log(context.req.cookies);
    const token =
      context.cookies && context.cookies.token ? context.cookies.token : null;
    // console.log({ token });
    if (token) {
      try {
        const { address } = jwt.verify(token, JWT_SECRET);
        return { address: address };
      } catch (err) {
        throw new AuthenticationError(
          'Authentication token is invalid, please log in '
        );
      }
    }
  },

  async Transaction(_parent, _args, ctx, _info) {
    // console.log('boop');
    return neo4jgraphql(_parent, _args, ctx, _info);
  },
  serverStatus,
};

module.exports = Query;
