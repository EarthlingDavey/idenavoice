require('dotenv').config();

let endpoint = `/graphql`;
if (process.env.NODE_ENV !== 'production') {
  endpoint = `https://idenavoice.com/graphql`;
}
if (process.env.GRAPHQL_URI) {
  endpoint = process.env.GRAPHQL_URI;
}

module.exports = {
  serverRuntimeConfig: {
    JWT_SECRET: 'changeme',
  },
  env: {
    url: process.env.VERCEL_URL
      ? 'https://' + process.env.VERCEL_URL
      : 'http://localhost',
    endpoint,
  },
};
