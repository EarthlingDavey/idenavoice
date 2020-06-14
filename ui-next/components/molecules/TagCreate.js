import { TagCreateStyles } from './TagStyles';
import Textarea from '../atoms/Textarea';

import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const CREATE_TAG = gql`
  mutation CreateTag($name: String!) {
    CreateTag(name: $name) {
      id
      name
    }
  }
`;

export default function TagCreate(props) {
  let textarea;
  const [CreateTag, { data }] = useMutation(CREATE_TAG);

  return (
    <TagCreateStyles>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          // console.log(textarea);
          CreateTag({
            variables: { name: textarea.value },
            refetchQueries: ['GET_TAGS'],
          });
          textarea.value = '';
        }}
      >
        <Textarea
          //  handleChange={this.handleChange}
          //   value={this.state.question}
          as="input"
          passRef={(node) => {
            textarea = node;
          }}
          name="tag"
          placeholder="Type your tag here"
        ></Textarea>
        <button type="submit">Add Tag</button>
      </form>
    </TagCreateStyles>
  );
}
