import Link from 'next/link';

import TimeAgo from 'react-timeago';
import frenchStrings from 'react-timeago/lib/language-strings/en';
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter';

import { TxListItemStyles } from './TxListItemStyles';
import RoboImg from '../atoms/RoboImg';
import Badges from '../atoms/Badges';
import { MonoStyles } from '../atoms/MonoStyles';
import { InternalLinkStyles } from '../atoms/InternalLinkStyles';

const formatter = buildFormatter(frenchStrings);

export default function TxListItem(props) {
  const user = props.user || props.tx.user;
  return (
    <TxListItemStyles>
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
            <Link href={`/tx/${props.tx.hash}`} passHref>
              <InternalLinkStyles>
                {props.tx.answer.name}
                {props.tx.txChose.old && <> - (Old vote not counted)</>}
              </InternalLinkStyles>
            </Link>{' '}
            <TimeAgo
              date={props.tx.timestamp.formatted}
              formatter={formatter}
            />
          </div>
          <MonoStyles> {props.tx.hash}</MonoStyles>
        </div>
      </div>
    </TxListItemStyles>
  );
}
