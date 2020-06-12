import { withApollo } from '../lib/withApollo';
import gql from 'graphql-tag';

import App from '../components/App';
import SignInTemplate from '../components/templates/SignIn';

const ViewerQuery = gql`
  query ViewerQuery {
    viewer {
      address
    }
  }
`;

const SignIn = () => {
  return (
    <App>
      <SignInTemplate></SignInTemplate>
    </App>
  );
};

export default withApollo()(SignIn);
