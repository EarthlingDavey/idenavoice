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
  query QuestionsQuery($filter: _QuestionFilter) {
    Question(orderBy: epoch_desc, first: 8, filter: $filter) {
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
    Tag {
      id
      name
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
  let questionFilter = {};

  if (props.selectedTags.length > 0) {
    questionFilter = { tags_some: { id: props.selectedTags[0] } };
  }

  // console.log(questionFilter);

  const { loading, error, data, refetch } = useQuery(QUESTIONS_QUERY, {
    variables: {
      filter: questionFilter,
    },
    pollInterval: 3500,
  });

  if (loading || !data) {
    return <p>Loading</p>;
  }

  const questions = data.Question ? data.Question : [];

  return (
    <QuestionsStyles
      SortFilterBarStyles={SortFilterBarStyles}
      ButtonGroupStyles={ButtonGroupStyles}
    >
      {props.children}
      {!questions.length && <p>No questions to show</p>}
      {questions.map((question, i) => {
        return (
          <Question
            key={question.id}
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
