import { TitleWrapper, Wrapper, ContentWrapper } from './AskRowStyles';

import TagList from '../molecules/TagList';
import TagCreate from '../molecules/TagCreate';
import TagVoting from '../molecules/TagVoting';
import TagVotingExplain from '../molecules/TagVotingExplain';

export default function TagsRow(props) {
  return (
    <>
      <ContentWrapper width="50%">
        <h3>Tag creation </h3>
        <TagCreate userLimits={props.userLimits}></TagCreate>
      </ContentWrapper>
      <ContentWrapper width="50%">
        <h3>My tags </h3>
        <TagList userAddress={props.userAddress}></TagList>
      </ContentWrapper>
      <ContentWrapper width="50%">
        <h3>How tag preferences works</h3>
        <TagVotingExplain></TagVotingExplain>
      </ContentWrapper>
      <ContentWrapper width="50%">
        <h3>Your Tag preferences</h3>
        <TagVoting userAddress={props.userAddress}></TagVoting>
      </ContentWrapper>
    </>
  );
}
