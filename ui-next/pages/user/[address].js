import { withApollo } from '../../lib/withApollo';
import App from '../../components/App';
import SingleUser from '../../components/templates/SingleUser';
import { withRouter } from 'next/router';

const SingleUserPage = (props) => {
  return (
    <App>
      <SingleUser
        address={props.router.query ? props.router.query.address : ''}
      ></SingleUser>
    </App>
  );
};

export default withRouter(withApollo()(SingleUserPage));
