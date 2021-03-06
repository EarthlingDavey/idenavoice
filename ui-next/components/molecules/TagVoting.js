import { toast } from 'react-toastify';
import { TagVotingStyles } from './TagStyles';
import TagVotingInner from './TagVotingInner';

import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { spareCredits } from '../../lib/utils';

let toasts = {};

const GET_TAGS = gql`
  query GET_TAGS($filter: _ActionFilter) {
    Tag(orderBy: voteCountCache_desc) {
      id
      name
      actions(filter: $filter) {
        name
        qty
      }
    }
  }
`;
const CREATE_MY_TAG_UPVOTES = gql`
  mutation CREATE_MY_TAG_UPVOTES($actions: [tagActionInput!]!) {
    CreateMyTagUpVotes(actions: $actions) {
      name
      qty
    }
  }
`;

function getInitTags(tags) {
  let initTags = [];

  for (let i = 0; i < tags.length; i++) {
    const t = tags[i];
    console.log(t);
    initTags.push({
      t: 1,
      id: t.id,
      name: t.name,
      qty: t.actions[0] && t.actions[0].qty ? t.actions[0].qty : parseInt(0),
    });
  }

  return initTags;
}

export default function TagVoting(props) {
  let variables = {
    filter: {
      name_not: '',
    },
  };

  if (props.userAddress) {
    variables.filter = {
      user: {
        address: props.userAddress,
      },
    };
  }

  const { ...result } = useQuery(GET_TAGS, {
    variables,
    // pollInterval: 3500,
  });
  const [CreateMyTagUpVotes, { data2 }] = useMutation(CREATE_MY_TAG_UPVOTES);

  const data = result.data;

  // console.log(data);

  if (!data) {
    return <p>Loading</p>;
  }

  const tagsWithCount = getInitTags(data.Tag);

  async function votingMutation(tags) {
    // console.log('in votingMutation');
    // console.log({ tags });
    // console.log('spare:' + spareCredits(tags));

    let actions = [];

    for (let i = 0; i < tags.length; i++) {
      const t = tags[i];
      if (t.qty <= 0) {
        continue;
      }
      // console.log(t);
      actions.push({
        tagId: t.id,
        name: 'upvote',
        qty: parseInt(t.qty),
      });
    }
    // console.log({ actions });

    const response = await CreateMyTagUpVotes({
      variables: { actions },
      // refetchQueries: ['GET_TAGS'],
    });
    if (response.data) {
      if (toast.isActive(toasts.updated)) {
        toast.dismiss(toasts.updated);
        setTimeout(function () {
          toasts.updated = toast('Your votes have been re-updated.');
        }, 1000);
      } else {
        toasts.updated = toast('Your votes have been updated.');
      }
    }
    // console.log({ response });
  }

  return (
    <TagVotingStyles>
      <p>
        You have 100 vote credits to spread across the following categories.
      </p>
      <p>Questions from tags with the most votes are shown on the homepage.</p>
      <p>
        Accounts of all statuses can assign preferences for each tag.
        <br />
        Your preferences are only counted towards totals if you are Verified or
        Human status.
      </p>

      <TagVotingInner
        initialTags={tagsWithCount}
        tags={data.Tag}
        votingMutation={votingMutation}
      ></TagVotingInner>
    </TagVotingStyles>
  );
}
