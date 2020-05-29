import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { SingleStyles } from './SingleStyles';
import SingleQuestion from './SingleQuestion';
import SingleResponse from './SingleResponse';

import Link from 'next/link';
const querystring = require('querystring');

const TRANSACTION_QUERY = gql`
  query QuestionsQuery($hash: String!, $state: [State]) {
    Transaction(hash: $hash) {
      hash
      user {
        address
        state
        age
      }
      # If we have a response
      txChose {
        old
      }
      timestamp {
        formatted
      }
      answer {
        name
        question {
          name
          timestamp {
            formatted
          }
          answers {
            name
            countNewestOnly
          }
          transaction {
            hash
            user {
              address
              state
              age
            }
          }
        }
      }
      # If we have a question
      questions {
        name
        timestamp {
          formatted
        }
        answers {
          name
          countNewestOnly
        }
        allAnswersTransactionsByState(state: $state) {
          hash
          user {
            address
            state
            age
          }
          timestamp {
            formatted
          }
          answer {
            name
          }
          txChose {
            old
          }
        }
      }
    }
  }
`;

export default function Single(props) {
  const { ...result } = useQuery(TRANSACTION_QUERY, {
    variables: {
      hash: props.hash,
      state: ['Newbie', 'Verified', 'Human', 'Suspended'],
    },
    pollInterval: 7000,
  });

  // console.log(result);

  if (!result.data) {
    return <SingleStyles>Loading</SingleStyles>;
  }

  if (!result.data.Transaction[0]) {
    return <SingleStyles>404 page not found</SingleStyles>;
  }

  const tx = result.data.Transaction[0];

  console.log({ tx });

  return (
    <SingleStyles>
      {tx.questions.length > 0 && <SingleQuestion tx={tx} />}
      {tx.answer && <SingleResponse tx={tx} />}
    </SingleStyles>
  );
}
