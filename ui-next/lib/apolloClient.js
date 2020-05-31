import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import fetch from 'isomorphic-unfetch';
import gql from 'graphql-tag';
import Question from '../components/molecules/Question';
import { GET_QUEUED_QUESTIONS } from '../components/molecules/QueuedQuestions';

export default function createApolloClient(initialState, ctx) {
  // The `ctx` (NextPageContext) will only be present on the server.
  // use it to extract auth headers (ctx.req) or similar.

  // Create a WebSocket link:

  // const wsLink = process.browser
  //   ? new WebSocketLink({
  //       uri: process.env.wsUrl,
  //       options: {
  //         reconnect: true,
  //       },
  //     })
  //   : () => {
  //       console.log('SSR');
  //     };

  console.log(process.browser);
  console.log(process.env.endpointWeb);

  const httpLink = new HttpLink({
    uri: process.browser ? process.env.endpointWeb : process.env.endpoint, // Server URL (must be absolute)
    credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
    fetch,
  });

  // using the ability to split links, you can send data to each link
  // depending on what kind of operation is being sent
  // const link = split(
  //   // split based on operation type
  //   ({ query }) => {
  //     const definition = getMainDefinition(query);
  //     return (
  //       definition.kind === 'OperationDefinition' &&
  //       definition.operation === 'subscription'
  //     );
  //   },
  //   wsLink,
  //   httpLink
  // );

  const cache = new InMemoryCache().restore(initialState);

  const client = new ApolloClient({
    ssrMode: Boolean(ctx),
    link: httpLink,
    cache,
    resolvers: {
      Mutation: {
        updateQueuedQuestions: (_root, variables, { cache, getCacheKey }) => {
          const query = gql`
            query GetQueuedQuestions {
              queuedQuestions @client {
                question
                type
                hash
                timestamp {
                  formatted
                }
              }
            }
          `;

          const previous = cache.readQuery({ query });
          const newQuestion = {
            question: variables.question,
            __typename: 'Transaction',
            type: 'ynp',
            hash: 'abc',
            timestamp: {
              formatted: Date.now(),
              __typename: '_Neo4jDateTime',
            },
          };
          const data = {
            queuedQuestions: [...previous.queuedQuestions, newQuestion],
          };

          cache.writeQuery({
            query: GET_QUEUED_QUESTIONS,
            data,
          });
          return newQuestion;
        },
        removeQueuedQuestions: (_root, variables, { cache, getCacheKey }) => {
          const data = {
            queuedQuestions: [],
          };
          cache.writeQuery({
            data,
          });
          return [];
        },
      },
    },
  });

  const data = {
    queuedQuestions: [],
  };

  cache.writeData({ data });

  client.onResetStore(() => cache.writeData({ data }));

  return client;
}
