import App from '../components/App';
import Link from 'next/link';

export default () => (
  <App>
    <div>
      This is a static page goto{' '}
      <Link href="/">
        <a>dynamic</a>
      </Link>{' '}
      page.
    </div>
  </App>
);
