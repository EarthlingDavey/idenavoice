import React from 'react';
import Link from 'next/link';
import Question from './Question';
import { QuestionsStyles } from './QuestionStyles';
import { TxListItemStyles } from './TxListItemStyles';

import Button from '../atoms/Button';
import SubTest from './SubTest';

import { ButtonStyles, ButtonGroupStyles } from '../atoms/ButtonStyles';

export function QuestionsBlock(props) {
  const data = props.data;

  if (!data) {
    return <p>Loading</p>;
  }
  if (!data.Question || data.Question.length == 0) {
    return <p>No questions</p>;
  }

  return (
    <QuestionsStyles ButtonGroupStyles={ButtonGroupStyles}>
      {data.Question.map((question, i) => {
        return (
          <Question
            key={question.transaction.hash}
            question={question}
            allTags={data.Tag}
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
