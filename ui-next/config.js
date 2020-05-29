// This is client side config only - don't put anything in here that shouldn't be public!
const endpoint =
  process.env.NODE_ENV !== 'production'
    ? `http://localhost:4001/graphql`
    : `/graphql`;
const baseUrl =
  process.env.NODE_ENV !== 'production'
    ? 'http://localhost'
    : 'http://localhost ';

module.exports = {
  endpoint,
  baseUrl,
};
