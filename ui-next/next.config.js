require('dotenv').config();

module.exports = {
  serverRuntimeConfig: {
    JWT_SECRET: 'changeme',
  },
  env: {
    url: process.env.VERCEL_URL
      ? 'https://' + process.env.VERCEL_URL
      : 'http://localhost',
  },
};
