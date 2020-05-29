import React from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Question from './Question';

const GET_QUEUED_QUESTIONS = gql`
  {
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

export default function QueuedQuestions(props) {
  const { data, client } = useQuery(GET_QUEUED_QUESTIONS);
  if (!data || !data.queuedQuestions || data.queuedQuestions.length === 0) {
    return null;
  }
  return (
    <div>
      {data.queuedQuestions.map((question, i) => {
        return (
          <Question key={i} question={question} placeholder={true}></Question>
        );
      })}
    </div>
  );
}

export { GET_QUEUED_QUESTIONS };
