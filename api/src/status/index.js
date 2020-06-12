const fetch = require('node-fetch');
const { getSyncedUpTo } = require('../controllers/transactions');

/**
 * Helper function to fetch a  url
 */

const safeFetch = async (url, options) => {
  try {
    return await fetch(url, options);
  } catch (error) {
    console.log(error);
    return false;
  }
};

function apiStatus() {
  let deployUrl = 'http://localhost';
  if (
    process.env.VERCEL_GITHUB_ORG &&
    process.env.VERCEL_GITHUB_REPO &&
    process.env.VERCEL_GITHUB_COMMIT_SHA
  ) {
    deployUrl = `https://github.com/${process.env.VERCEL_GITHUB_ORG}/${process.env.VERCEL_GITHUB_REPO}/tree/${process.env.VERCEL_GITHUB_COMMIT_SHA}`;
  }

  let api = {
    name: 'api',
    code: 200,
    message: 'ok - queried just now',
    links: [
      {
        text:
          deployUrl === 'http://localhost'
            ? 'running locally'
            : 'deployed from GitHub',
        href: deployUrl,
      },
    ],
  };

  return api;
}

async function dbStatus(driver) {
  let db = {
    name: 'database',
    code: 200,
    message: 'warning - cannot connect',
  };

  // console.log(ctx.driver);

  let session = driver.session();
  // console.log(session);
  const block = await getSyncedUpTo(session);
  // console.log(block);
  session.close();

  if (block && block.value) {
    db.message = `ok - synced to block ${block.value}`;
  }

  return db;
}

async function backendStatus() {
  let backend = {
    name: 'backend',
    code: 200,
    message: 'warning - cannot connect',
  };

  if (process.env.SYNC_SERVER) {
    const url = `${process.env.SYNC_SERVER}/status`;
    const response = await safeFetch(url, {});
    const json = await response.json();
    if (json && json.code === 'ok') {
      backend.message = `ok - responded just now`;
    }
    if (json && json.deployUrl) {
      backend.links = [
        {
          text: 'deployed from GitHub',
          href: json.deployUrl,
        },
      ];
    }
  }

  return backend;
}

async function serverStatus(_parent, _args, ctx, _info) {
  const api = apiStatus();
  const db = dbStatus(ctx.driver);
  const backend = backendStatus();

  const a = [
    api,
    db,
    backend,
    // { name: 'node', code: 200, message: 'ok' },
    // { name: 'database', code: 200, message: 'ok' },
  ];

  // console.log(a);

  return a;
}

module.exports = {
  serverStatus,
};
