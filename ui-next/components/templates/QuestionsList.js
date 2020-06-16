import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { QuestionsListStyles } from './QuestionsListStyles';
import SortFilterBar from '../molecules/SortFilterBar';
import { BigHeadingStyles } from '../atoms/BigHeadingStyles';
import Question from '../molecules/Question';

const QUESTIONS_QUERY = gql`
  query QuestionsQuery(
    $orderBy: [_QuestionOrdering]
    $filter: _QuestionFilter
  ) {
    Question(orderBy: $orderBy, filter: $filter) {
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
          state
          age
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
    }
  }
`;

function Questions(props) {
  let userStates = Object.keys(props.userState).filter(
    (key) => props.userState[key]
  );

  let questionFilter = {
    AND: [{ transaction_in: { user: { state_in: userStates } } }],
  };

  if (props.selectedTags.length > 0) {
    questionFilter.AND.push({ tags_some: { id_in: props.selectedTags } });
  }

  let variables = {
    orderBy: props.orderBy || null,
    filter: questionFilter,
  };

  console.log(variables);

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
            allTags={data.Tag}
            signedIn={data.viewer ? true : false}
          ></Question>
        );
      })}
    </>
  );
}

function toggler(collection, item) {
  var idx = collection.indexOf(item);
  if (idx !== -1) {
    collection.splice(idx, 1);
  } else {
    collection.push(item);
  }
  return collection;
}

class QuestionsList extends React.Component {
  constructor(props) {
    super(props);
    this.handleTagClick = this.handleTagClick.bind(this);
  }

  state = {
    userState: { Human: true, Newbie: true, Verified: true, Suspended: true },
    reported: true,
    orderBy: 'epoch_desc',
    selectedTags: [],
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

  handleTagClick(e, tagId) {
    e.preventDefault();
    console.log(e, tagId);

    this.setState((prevState) => ({
      selectedTags: toggler(prevState.selectedTags, tagId),
    }));
  }

  render() {
    return (
      <QuestionsListStyles BigHeadingStyles={BigHeadingStyles}>
        <div className="scrolling-x-lg">
          <BigHeadingStyles>QUESTIONS</BigHeadingStyles>
        </div>
        <SortFilterBar
          {...this.state}
          handleChange={this.handleChange}
          handleTagClick={this.handleTagClick}
        ></SortFilterBar>
        <Questions {...this.state}></Questions>
      </QuestionsListStyles>
    );
  }
}

export default QuestionsList;
