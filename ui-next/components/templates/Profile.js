import BigHeading from '../atoms/BigHeading';
import {
  TitleWrapper,
  Wrapper,
  ContentWrapper,
} from '../organisms/AskRowStyles';
import UserProfile from '../molecules/UserProfile';
import TagsRow from '../organisms/TagsRow';

import { SingleStyles } from './SingleStyles';

export default function SignInTemplate(props) {
  return (
    <Wrapper wrap={`true`} id="about">
      <TitleWrapper>
        <BigHeading align="center">ACCOUNT</BigHeading>
      </TitleWrapper>
      <ContentWrapper width="100%">
        <UserProfile user={props.user}></UserProfile>
      </ContentWrapper>

      {/* <ContentWrapper width="50%">
        <h3>Right</h3>
        <p>
          You'll need the Official Idena wallet, and have at least Newbie
          status. Asking and answering are similar procedures...
        </p>
      </ContentWrapper> */}

      <ContentWrapper width="100%">
        <TagsRow
          userLimits={props.user.limits}
          userAddress={props.user.address}
        ></TagsRow>
      </ContentWrapper>
    </Wrapper>
  );
}
