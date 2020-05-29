import { withApollo } from '../lib/withApollo';
import gql from 'graphql-tag';
import Link from 'next/link';
import { useQuery } from '@apollo/react-hooks';
import { useRouter } from 'next/router';

import App from '../components/App';
import AskRow from '../components/organisms/AskRow';
import AnswerRow from '../components/organisms/AnswerRow';
import AboutRow from '../components/organisms/AboutRow';

const ViewerQuery = gql`
  query ViewerQuery {
    viewer {
      address
    }
  }
`;

const Index = () => {
  // const { data, loading } = useQuery(ViewerQuery);

  // console.log(data);

  // if (
  //   loading === false &&
  //   data.viewer === null &&
  //   typeof window !== 'undefined'
  // ) {
  //   router.push('/signin');
  // }

  // if (data && data.viewer) {
  //   return (
  //     <>
  //       Logged in
  //       <Ask></Ask>
  //     </>
  //   );
  // }

  return (
    <App>
      <AskRow></AskRow>
      <AnswerRow></AnswerRow>
      <AboutRow></AboutRow>
      {/* <Ask></Ask> */}
    </App>
  );
};

export default withApollo()(Index);
