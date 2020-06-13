import { useQuery } from '@apollo/react-hooks';
import { toast } from 'react-toastify';
import Router from 'next/router';
import { withApollo } from '../lib/withApollo';

import gql from 'graphql-tag';
// import { useRouter } from 'next/router';
import App from '../components/App';
import Profile from '../components/templates/Profile';

const VIEWER_QUERY = gql`
  query ViewerQuery {
    viewer {
      address
      address
      age
      state
    }
  }
`;

const ProfilePage = () => {
  // const router = useRouter();

  const { client, loading, data } = useQuery(VIEWER_QUERY, {
    fetchPolicy: 'network-only',
  });

  if (loading || data === undefined) {
    return (
      <App>
        <p>Loading</p>
      </App>
    );
  }

  if (!loading && data && !data.viewer) {
    Router.push('/', '/', { shallow: true });
    return null;
  }

  if (data && data.viewer) {
    return (
      <App>
        <Profile user={data.viewer}></Profile>
      </App>
    );
  }
};

export default withApollo()(ProfilePage);
