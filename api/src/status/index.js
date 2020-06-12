const fetch = require('node-fetch');
const { getSyncedUpTo } = require('../controllers/transactions');

let nodeRequestId = 0;

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

async function getLastBlock(url, key) {
  const body = {
    method: 'bcn_lastBlock',
    params: [],
    id: nodeRequestId++,
    key,
  };
  console.log(JSON.stringify(body));
  const options = {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  };
  const response = await safeFetch(url, options);
  console.log(response);
  const json = await response.json();
  return json.result ? json.result : false;
}

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
    // db.message = `ok - synced to block ${block.value}`;
    db.message = `ok - responded just now`;
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

async function nodeStatus() {
  let node = {
    name: 'node',
    code: 200,
    message: 'warning - cannot connect',
  };

  if (process.env.NODE_URI && process.env.NODE_KEY) {
    const url = `${process.env.NODE_URI}`;
    const key = `${process.env.NODE_KEY}`;
    const block = await getLastBlock(url, key);
    // console.log(block);
    if (block.height) {
      node.message = `ok - last block time:`;
    }
    if (block.timestamp) {
      node.timestamp = block.timestamp.toString();
    }
  }

  return node;
}

async function serverStatus(_parent, _args, ctx, _info) {
  const api = apiStatus();
  const db = dbStatus(ctx.driver);
  const backend = backendStatus();
  const node = nodeStatus();

  const a = [api, db, backend, node];

  // console.log(a);

  return a;
}

module.exports = {
  serverStatus,
};
