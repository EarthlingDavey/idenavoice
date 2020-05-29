import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { SingleStyles } from './SingleStyles';
import SingleQuestion from './SingleQuestion';
import SingleResponse from './SingleResponse';
import BigHeading from '../atoms/BigHeading';
import Question from '../molecules/Question';
import UserProfile from '../molecules/UserProfile';
import TxListItem from '../molecules/TxListItem';

import Link from 'next/link';
const querystring = require('querystring');

const USER_QUERY = gql`
  query UserQuery($a: String!) {
    User(address: $a) {
      address
      age
      state
      transactions {
        hash
        #
        answer {
          name
        }
        txChose {
          old
        }
        timestamp {
          formatted
        }
        questions {
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
          }
        }
      }
    }
  }
`;

export default function SingleUser(props) {
  // return <p>s</p>;

  // console.log(props.address);

  const { ...result } = useQuery(USER_QUERY, {
    variables: {
      a: props.address,
    },
    // pollInterval: 3500,
  });

  // console.log(result);

  if (!result.data) {
    return <SingleStyles>Loading</SingleStyles>;
  }

  if (!result.data.User[0]) {
    return <SingleStyles>404 page not found</SingleStyles>;
  }

  const user = result.data.User[0];

  // console.log({ user });

  return (
    <SingleStyles>
      <div>
        <BigHeading>USER</BigHeading>
        <UserProfile user={user}></UserProfile>
        <BigHeading>QUESTIONS</BigHeading>
        {user.transactions.map((tx, i) => {
          if (!tx.questions[0]) {
            return;
          }
          const question = tx.questions[0];
          return (
            <Question
              key={tx.hash}
              question={question}
              user={user}
              transaction={tx}
            ></Question>
          );
        })}
        <BigHeading>RESPONSES</BigHeading>
        {/* <AnswerHistory question={question}></AnswerHistory> */}
        {user.transactions.map((tx, i) => {
          if (!tx.answer) {
            return;
          }
          // const answer = tx.answer[0];
          return <TxListItem user={user} key={tx.hash} tx={tx}></TxListItem>;
        })}
      </div>
    </SingleStyles>
  );
}
