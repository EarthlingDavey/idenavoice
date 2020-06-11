require('dotenv').config();

let endpoint = `/graphql`;
if (process.env.NODE_ENV !== 'production') {
  endpoint = `https://idenavoice.com/graphql`;
}
if (process.env.GRAPHQL_URI) {
  endpoint = process.env.GRAPHQL_URI;
}
let endpointWeb = endpoint;
if (process.env.GRAPHQL_WEB_URI) {
  endpointWeb = process.env.GRAPHQL_WEB_URI;
}

let deployUrl = 'http://localhost';

if (
  process.env.VERCEL_GITHUB_ORG &&
  process.env.VERCEL_GITHUB_REPO &&
  process.env.VERCEL_GITHUB_COMMIT_SHA
) {
  deployUrl = `https://github.com/${process.env.VERCEL_GITHUB_ORG}/${process.env.VERCEL_GITHUB_REPO}/commit/${process.env.VERCEL_GITHUB_COMMIT_SHA}`;
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
    endpointWeb,
    deployUrl,
  },
};
