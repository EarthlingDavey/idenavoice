import { useQuery, useMutation } from '@apollo/react-hooks';
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

const GET_TAG_DETAILS = gql`
  query TagDetails($tagId: ID!, $questionId: ID!) {
    Tag(id: $tagId) {
      id
      countActionsWithQuestionUp(questionId: $questionId)
      countActionsWithQuestionDown(questionId: $questionId)
    }
  }
`;

function TagPopup(props) {
  console.log(props.id);

  const { ...result } = useQuery(GET_TAG_DETAILS, {
    variables: { tagId: props.id, questionId: props.questionId },
    // pollInterval: 3500,
  });

  const details =
    result.data && result.data.Tag[0]
      ? result.data.Tag[0]
      : { countActionsWithQuestionUp: 0, countActionsWithQuestionDown: 0 };

  console.log(details);

  const [CreateActionOnTagAndQuestion, { data }] = useMutation(CREATE_ACTION);

  // return <p>hi</p>;

  async function handleAction(e, tagId, questionId, name) {
    e.preventDefault();
    // console.log(questionId, tagId, name);
    // return false;
    CreateActionOnTagAndQuestion({
      variables: {
        questionId,
        tagId,
        name,
      },
      refetchQueries: ['TagDetails'],
    });
  }

  return (
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
            tag is relevant 🔼 ({details.countActionsWithQuestionUp})
          </a>
          <br></br>
          <a
            href=""
            onClick={(e) =>
              handleAction(e, props.id, props.questionId, 'downvote')
            }
          >
            tag is not relevant 🔽({details.countActionsWithQuestionDown})
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
  );
}

export default function Tag(props) {
  return (
    <TagStyles>
      <a className="label" onClick={props.onClick}>
        #{props.name}
      </a>
      {props.explode && (
        <TagPopup
          name={props.name}
          signedIn={props.signedIn}
          id={props.id}
          questionId={props.questionId}
          onClick={props.onClick}
        ></TagPopup>
      )}
    </TagStyles>
  );
}
