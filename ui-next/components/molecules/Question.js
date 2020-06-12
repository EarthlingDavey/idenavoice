import Link from 'next/link';
const querystring = require('querystring');

import TimeAgo from 'react-timeago';
import englishStrings from 'react-timeago/lib/language-strings/en';
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter';
import { notifyWallet } from '../../lib/wallet';

import { QuestionStyles } from './QuestionStyles';
import { TxListItemStyles } from './TxListItemStyles';
import Button from '../atoms/Button';
import { ButtonStyles, ButtonGroupStyles } from '../atoms/ButtonStyles';
import RoboImg from '../atoms/RoboImg';
import { MonoStyles } from '../atoms/MonoStyles';
import { InternalLinkStyles } from '../atoms/InternalLinkStyles';
import Badges from '../atoms/Badges';

const formatter = buildFormatter(englishStrings);

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
      <Respond question={question} transaction={transaction}></Respond>
    </QuestionStyles>
  );
}
