import { useSubscription } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const COUNT_SUBSCRIPTION = gql`
  subscription counter {
    counter {
      count
    }
  }
`;

function DontReadTheComments() {
  const { data, loading } = useSubscription(COUNT_SUBSCRIPTION, {
    variables: {},
  });

  console.log(data);

  // return <h4>a</h4>;
  return <h4>New count: {!loading && data.counter.count}</h4>;
}

export default DontReadTheComments;
