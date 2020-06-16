import { toast } from 'react-toastify';

import { TagCreateStyles } from './TagStyles';
import Textarea from '../atoms/Textarea';
import { ButtonStyles } from '../atoms/ButtonStyles';

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
  const [CreateTag, { data, error }] = useMutation(CREATE_TAG);

  var tagsLimit = props.userLimits.find((obj) => {
    return obj.name === 'tags';
  });

  if (error) {
    toast('Oops an error occurred');
  }
  if (!error && data) {
    toast('Tag created');
  }

  return (
    <TagCreateStyles>
      <p>You can create {tagsLimit.number} tags</p>
      <p>
        Everyone will be able to see them, they can be assigned to questions.
        Questions from the top 3 tags will be shown on the homepage.
      </p>
      <p>All lowercase and only a-z letters</p>
      <form
        disabled={tagsLimit.number === 0}
        onSubmit={(e) => {
          e.preventDefault();
          // console.log(textarea);

          var letters = /^[a-z]+$/;

          if (textarea.value.match(letters)) {
            CreateTag({
              variables: { name: textarea.value },
              refetchQueries: ['GET_TAGS'],
            });

            textarea.value = '';
          } else {
            toast('Tags should be all lower case, no spaces. Try again ');
          }
        }}
      >
        <Textarea
          //  handleChange={this.handleChange}
          //   value={this.state.question}
          disabled={tagsLimit.number === 0}
          as="input"
          passRef={(node) => {
            textarea = node;
          }}
          name="tag"
          placeholder="Type your tag"
        ></Textarea>
        <ButtonStyles
          disabled={tagsLimit.number === 0}
          as="button"
          type="submit"
        >
          <span>Add Tag</span>
        </ButtonStyles>
      </form>
    </TagCreateStyles>
  );
}
