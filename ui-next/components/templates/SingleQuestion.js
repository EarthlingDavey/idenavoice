import BigHeading from '../atoms/BigHeading';
import Question from '../molecules/Question';
import AnswerHistory from '../molecules/AnswerHistory';
import SortFilterBarQuestion from '../molecules/SortFilterBarQuestion';

export default function SingleQuestion(props) {
  let question = props.tx.questions[0];

  return (
    <div>
      <BigHeading>QUESTION</BigHeading>
      <Question
        allTags={props.allTags}
        question={question}
        transaction={props.tx}
      ></Question>
      <BigHeading>RESPONSES</BigHeading>
      {/* <SortFilterBarQuestion></SortFilterBarQuestion> */}
      <AnswerHistory
        transactions={question.allAnswersTransactionsByState}
      ></AnswerHistory>
    </div>
  );
}
