import BigHeading from '../atoms/BigHeading';
import {
  TitleWrapper,
  Wrapper,
  ContentWrapper,
} from '../organisms/AskRowStyles';
import { SingleStyles } from './SingleStyles';

export default function SignInTemplate(props) {
  return (
    <SingleStyles>
      <TitleWrapper>
        <BigHeading>
          APP<span aria-hidden="true"></span>WILL
          <span aria-hidden="true"></span>OPEN
        </BigHeading>
      </TitleWrapper>
      <ContentWrapper>
        <p>The Idena App will open now. </p>
        <p>
          If it does not open,{' '}
          <a href="https://idena.io/?view=download">download and install</a>{' '}
        </p>
      </ContentWrapper>
    </SingleStyles>
  );
}
