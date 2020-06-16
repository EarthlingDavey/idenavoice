import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import Question from './Question';
import { QuestionsStyles } from './QuestionStyles';
import { TxListItemStyles } from './TxListItemStyles';
import { SortFilterBarStyles } from './SortFilterBarStyles';

import Button from '../atoms/Button';
import SubTest from './SubTest';

import Tag from '../atoms/Tag';
import { ButtonStyles, ButtonGroupStyles } from '../atoms/ButtonStyles';

const QUESTIONS_QUERY = gql`
  query QuestionsQuery($tagFilter: _TagFilter) {
    Tag(orderBy: voteCountCache_desc, first: 1, filter: $tagFilter) {
      id
      name
      questions(orderBy: epoch_desc, first: 8) {
        id
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
            age
            state
          }
        }
        tags {
          id
          name
        }
      }
    }
    viewer {
      address
      state
      limits {
        name
        number
      }
    }
  }
`;

export function QuestionsBlock(props) {
  let tagFilter = {};

  if (props.selectedTags.length > 0) {
    tagFilter = { id: props.selectedTags[0] };
  }

  const { loading, error, data, refetch } = useQuery(QUESTIONS_QUERY, {
    variables: {
      tagFilter,
    },
    pollInterval: 3500,
  });

  if (loading || !data) {
    return <p>Loading</p>;
  }
  // if (
  //   (data.Tag[0] && !data.Tag[0].questions) ||
  //   data.Tag[0].questions.length == 0
  // ) {
  //   return <p>No questions</p>;
  // }

  const questions = data.Tag[0].questions;

  return (
    <QuestionsStyles
      SortFilterBarStyles={SortFilterBarStyles}
      ButtonGroupStyles={ButtonGroupStyles}
    >
      {props.children}
      {!questions.length && <p>No questions with this tag</p>}
      {questions.map((question, i) => {
        return (
          <Question
            key={question.transaction.hash}
            question={question}
            allTags={data.Tag}
            signedIn={data.viewer ? true : false}
          ></Question>
        );
      })}
      <ButtonGroupStyles>
        <Link href="/questions" passHref>
          <Button href="/questions">
            <span>ALL QUESTIONS</span>
          </Button>
        </Link>
      </ButtonGroupStyles>
    </QuestionsStyles>
  );
}

export default QuestionsBlock;
