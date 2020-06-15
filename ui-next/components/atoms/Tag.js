import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { TagStyles } from './TagStyles';

const CREATE_ACTION = gql`
  mutation CreateActionOnTagAndQuestion(
    $questionId: ID!
    $tagId: ID!
    $name: ActionName!
  ) {
    CreateActionOnTagAndQuestion(
      tagId: $tagId
      questionId: $questionId
      name: $name
    ) {
      name
      qty
      tag {
        name
      }
      question {
        name
      }
    }
  }
`;

export default function Tag(props) {
  const [CreateActionOnTagAndQuestion, { data }] = useMutation(CREATE_ACTION);

  async function handleAction(e, tagId, questionId, name) {
    e.preventDefault();
    console.log(questionId, tagId, name);
    // return false;
    CreateActionOnTagAndQuestion({
      variables: {
        questionId,
        tagId,
        name,
      },
      // refetchQueries: ['GET_TAGS'],
    });
  }

  return (
    <TagStyles>
      <a className="label" onClick={props.onClick}>
        #{props.name}
      </a>
      {props.explode && (
        <div className="tag-popup">
          #{props.name}
          {props.signedIn && (
            <>
              <br />
              <a
                href=""
                onClick={(e) =>
                  handleAction(e, props.id, props.questionId, 'upvote')
                }
              >
                tag is relevant 🔼
              </a>
              <br></br>
              <a
                href=""
                onClick={(e) =>
                  handleAction(e, props.id, props.questionId, 'downvote')
                }
              >
                tag is not relevant 🔽
              </a>
            </>
          )}
          {!props.signedIn && (
            <>
              <br />
              <span>Sign in to say if this tag is relevant</span>
            </>
          )}
          <a href="" onClick={props.onClick} className="close">
            x
          </a>
        </div>
      )}
    </TagStyles>
  );
}
