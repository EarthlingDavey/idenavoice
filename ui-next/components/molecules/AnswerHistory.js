import React from 'react';
import TxListItem from '../molecules/TxListItem';

export class AnswerHistory extends React.Component {
  render() {
    return (
      <div>
        {this.props.transactions.map((tx, i) => {
          return (
            <div key={tx.hash}>
              <TxListItem tx={tx}></TxListItem>
            </div>
          );
        })}
      </div>
    );
  }
}

export default AnswerHistory;
