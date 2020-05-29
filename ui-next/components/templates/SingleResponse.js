import BigHeading from '../atoms/BigHeading';
import Question from '../molecules/Question';
import AnswerHistory from '../molecules/AnswerHistory';
import TxListItem from '../molecules/TxListItem';

export default function SingleResponse(props) {
  // let question = props.tx.questions[0];
  // question.transaction = {
  //   hash: props.tx.hash,
  //   user: props.tx.user,
  // };

  return (
    <div>
      <BigHeading>RESPONSE</BigHeading>
      <TxListItem tx={props.tx}></TxListItem>
      <BigHeading>TO</BigHeading>
      <Question
        // transaction={props.tx}
        question={props.tx.answer.question}
      ></Question>
    </div>
  );
}
