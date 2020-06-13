import TagList from '../molecules/TagList';
import TagCreate from '../molecules/TagCreate';
import TagVoting from '../molecules/TagVoting';

export default function TagsRow(props) {
  return (
    <div>
      <h3>Tag list </h3>
      <TagList></TagList>
      <h3>My tags </h3>
      <TagList userAddress={props.userAddress}></TagList>
      <h3>Tag creation </h3>
      <TagCreate></TagCreate>
      <h3>Tag voting</h3>
      <TagVoting></TagVoting>
    </div>
  );
}
