import { withApollo } from '../lib/withApollo';
import gql from 'graphql-tag';
import Link from 'next/link';
import { useQuery } from '@apollo/react-hooks';
import { useRouter } from 'next/router';

import App from '../components/App';
import AskRow from '../components/organisms/AskRow';
import AnswerRow from '../components/organisms/AnswerRow';
import AboutRow from '../components/organisms/AboutRow';

const Index = () => {
  return (
    <App>
      <AskRow></AskRow>
      <AnswerRow></AnswerRow>
      <AboutRow></AboutRow>
    </App>
  );
};

export default withApollo()(Index);
