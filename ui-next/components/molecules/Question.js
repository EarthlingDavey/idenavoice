import Link from 'next/link';
const querystring = require('querystring');
import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import TimeAgo from 'react-timeago';
import englishStrings from 'react-timeago/lib/language-strings/en';
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter';
import { notifyWallet } from '../../lib/wallet';

import QuestionTags from './QuestionTags';
import { QuestionStyles } from './QuestionStyles';
import { TxListItemStyles } from './TxListItemStyles';
import Button from '../atoms/Button';
import { ButtonStyles, ButtonGroupStyles } from '../atoms/ButtonStyles';
import RoboImg from '../atoms/RoboImg';
import { MonoStyles } from '../atoms/MonoStyles';
import { InternalLinkStyles } from '../atoms/InternalLinkStyles';
import Badges from '../atoms/Badges';

const formatter = buildFormatter(englishStrings);

const ADD_QUESTION_TAGS = gql`
  mutation MergeQuestionTags($questionId: ID!, $tagId: ID!) {
    MergeQuestionTags(from: { id: $questionId }, to: { id: $tagId }) {
      from {
        name
      }
      to {
        name
      }
    }
  }
`;
const REMOVE_QUESTION_TAGS = gql`
  mutation RemoveQuestionTags($questionId: ID!, $tagId: ID!) {
    RemoveQuestionTags(from: { id: $questionId }, to: { id: $tagId }) {
      from {
        name
      }
      to {
        name
      }
    }
  }
`;

function button(question, answer, txHash) {
  const schemaForChooseAction = {
    actionOption: {
      '@type': 'Answer',
      parentItem: txHash,
    },
    object: {
      '@type': 'Answer',
      text: answer,
    },
  };

  // console.log(schemaForChooseAction);

  const queryObject = {
    address: '0x21ac9c3ac3e9415dc82f461e94728835f170a1f4',
    amount: '0',
    comment: 'JSON-LD:ChooseAction:' + JSON.stringify(schemaForChooseAction),
  };

  const query = querystring.encode(queryObject);
  const dnaUrl = 'dna://send/v1?' + query;

  return dnaUrl;
}

function Respond(props) {
  let toasts = {};

  // console.log(props.question.answers);

  var sortOrder = ['Yes', 'No', 'Maybe'];

  props.question.answers.sort(function (a, b) {
    return sortOrder.indexOf(a.name) - sortOrder.indexOf(b.name);
  });

  return (
    <ButtonGroupStyles>
      {props.question.answers.map((answer, i) => {
        // console.log(answer);
        return (
          <Button
            key={answer.name}
            as="a"
            href={button(props.question, answer.name, props.transaction.hash)}
            onClick={() => (toasts = notifyWallet(toasts))}
          >
            <span>
              {answer.name} : {answer.countNewestOnly}
            </span>
          </Button>
        );
      })}
    </ButtonGroupStyles>
  );
}

export default function Question(props) {
  const transaction = props.transaction || props.question.transaction;
  const user = transaction.user || props.user || props.question.user;
  const question = props.question;

  const [MergeQuestionTags, { data }] = useMutation(ADD_QUESTION_TAGS);
  const [RemoveQuestionTags, { data2 }] = useMutation(REMOVE_QUESTION_TAGS);

  async function handleTagChange(tags, previousSelection) {
    // console.log(question.id);
    // console.log({ tags });

    let tagsToRemove;

    if (!tags & previousSelection) {
      tagsToRemove = previousSelection;
    } else if (previousSelection) {
      tagsToRemove = previousSelection.filter(
        ({ value: id1 }) => !tags.some(({ value: id2 }) => id2 === id1)
      );
    }

    if (tagsToRemove && tagsToRemove.length) {
      for (let i = 0; i < tagsToRemove.length; i++) {
        const t = tagsToRemove[i];
        console.log('removing:', t);
        RemoveQuestionTags({
          variables: {
            questionId: question.id,
            tagId: t.value,
          },
          refetchQueries: ['GET_TAGS'],
        });
      }
    }

    if (!tags || !tags.length) {
      return;
    }

    for (let i = 0; i < tags.length; i++) {
      const t = tags[i];
      // console.log(t);
      MergeQuestionTags({
        variables: {
          questionId: question.id,
          tagId: t.value,
        },
        refetchQueries: ['GET_TAGS'],
      });
    }
    // const response = await AddQuestionTags({
    //   variables: {
    //     questionId: '067b74f0-d75f-48ee-83fa-a525bba80c77',
    //     tagId: '54726691-8328-430c-9529-4f7ab9e6366c',
    //   },
    //   // refetchQueries: ['GET_TAGS'],
    // });
  }

  return (
    <QuestionStyles
      ButtonGroupStyles={ButtonGroupStyles}
      ButtonStyles={ButtonStyles}
      as={TxListItemStyles}
    >
      <div className="row">
        {user && (
          <div className="left">
            <Link href={`/user/${user.address}`}>
              <a>
                <RoboImg address={user.address} userState={user.state} />
              </a>
            </Link>
            <Badges user={user}></Badges>
          </div>
        )}
        <div className="right">
          <div>
            <Link href={`/tx/${transaction.hash}`} passHref>
              <InternalLinkStyles>{question.name}</InternalLinkStyles>
            </Link>{' '}
            <TimeAgo
              date={question.timestamp.formatted}
              formatter={formatter}
            />
          </div>
          <MonoStyles> {transaction.hash}</MonoStyles>
        </div>
      </div>
      <QuestionTags
        allTags={props.allTags}
        questionTags={props.question.tags}
        question={question}
        handleTagChange={handleTagChange}
        signedIn={props.signedIn}
      ></QuestionTags>
      <Respond question={question} transaction={transaction}></Respond>
    </QuestionStyles>
  );
}
