import { withApollo } from '../../lib/withApollo';
import App from '../../components/App';
import Single from '../../components/templates/Single';
import { withRouter } from 'next/router';

const SingleTxPage = (props) => {
  return (
    <App>
      <Single hash={props.router.query ? props.router.query.hash : ''}></Single>
    </App>
  );
};

export default withRouter(withApollo()(SingleTxPage));
