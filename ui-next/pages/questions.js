import { withApollo } from '../lib/withApollo';
import App from '../components/App';
import QuestionsList from '../components/templates/QuestionsList';

const QuestionsPage = (props) => {
  return (
    <App>
      <QuestionsList></QuestionsList>
    </App>
  );
};

export default withApollo()(QuestionsPage);
