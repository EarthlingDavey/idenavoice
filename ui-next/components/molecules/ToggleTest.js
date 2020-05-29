import React from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const TOGGLE_TODO = gql`
  mutation ToggleTodo($id: Int!) {
    toggleTodo(id: $id) @client
  }
`;

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

const UPDATE_QUEUED_QUESTIONS = gql`
  mutation updateQueuedQuestions($question: String!) {
    updateQueuedQuestions(question: $question) @client
  }
`;

function ToggleTest({ id, completed, text }) {
  const [queuedQuestions] = useMutation(GET_QUEUED_QUESTIONS, {
    variables: { question },
  });
  return (
    <li
      onClick={() =>
        client.writeData({
          data: {
            queuedQuestions: [
              {
                question: 'hi3',
                type: 'ynp',
                hash: 'abc',
                __typename: 'Transaction',
                timestamp: {
                  formatted: Date.now(),
                  __typename: '_Neo4jDateTime',
                },
              },
            ],
          },
        })
      }
    >
      {text}
    </li>
  );
}

export default ToggleTest;
