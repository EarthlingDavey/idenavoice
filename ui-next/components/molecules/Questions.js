import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import QuestionsBlock from './QuestionsBlock';

const QUESTIONS_QUERY = gql`
  query QuestionsQuery {
    Question(orderBy: timestamp_desc, first: 8) {
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
    }
  }
`;

export default function Questions(props) {
  const { ...result } = useQuery(QUESTIONS_QUERY, {
    variables: {},
    pollInterval: 3500,
  });

  // console.log(result);

  return (
    <>
      <QuestionsBlock {...result} />
    </>
  );
}
