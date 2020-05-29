import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { QuestionsListStyles } from './QuestionsListStyles';
import SortFilterBar from '../molecules/SortFilterBar';
import { BigHeadingStyles } from '../atoms/BigHeadingStyles';
import Question from '../molecules/Question';

const QUESTIONS_QUERY = gql`
  query QuestionsQuery($orderBy: [_QuestionOrdering], $userStates: [String!]) {
    Question(
      orderBy: $orderBy
      filter: { transaction_in: { user: { state_in: $userStates } } }
    ) {
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
          state
          age
        }
      }
    }
  }
`;

function Questions(props) {
  let userStates = Object.keys(props.userState).filter(
    (key) => props.userState[key]
  );

  let variables = {
    orderBy: props.orderBy || null,
    userStates,
  };

  // console.log(variables);

  const { ...result } = useQuery(QUESTIONS_QUERY, {
    variables,
    pollInterval: 3500,
  });

  // console.log(result);

  const data = result.data;

  if (!data) {
    return <p>Loading</p>;
  }
  if (!data.Question || data.Question.length == 0) {
    return <p>No questions</p>;
  }

  return (
    <>
      {data.Question.map((question, i) => {
        return (
          <Question
            key={question.transaction.hash}
            question={question}
          ></Question>
        );
      })}
    </>
  );
}

class QuestionsList extends React.Component {
  state = {
    userState: { Human: true, Newbie: true, Verified: true },
    reported: true,
    orderBy: 'timestamp_desc',
  };
  handleChange = (e) => {
    const { name, type, value } = e.target;
    if (name === 'userState') {
      this.setState((prevState) => ({
        userState: {
          ...prevState.userState,
          [value]: !prevState.userState[value],
        },
      }));

      return;
    }
    this.setState({ [name]: value });
  };

  render() {
    return (
      <QuestionsListStyles BigHeadingStyles={BigHeadingStyles}>
        <div className="scrolling-x-lg">
          <BigHeadingStyles>QUESTIONS</BigHeadingStyles>
        </div>
        <SortFilterBar
          {...this.state}
          handleChange={this.handleChange}
        ></SortFilterBar>
        <Questions {...this.state}></Questions>
      </QuestionsListStyles>
    );
  }
}

export default QuestionsList;
