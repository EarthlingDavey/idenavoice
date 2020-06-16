import { toast } from 'react-toastify';
import { TagListStyles } from './TagStyles';
import Textarea from '../atoms/Textarea';
import Button from '../atoms/Button';

import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const GET_TAGS = gql`
  query GET_TAGS($filter: _TagFilter) {
    Tag(filter: $filter, orderBy: voteCountCache_desc) {
      id
      name
      voteCountCache
      questions(first: 1) {
        id
      }
    }
  }
`;

const DELETE_TAG = gql`
  mutation DeleteTag($id: ID!) {
    DeleteTag(id: $id) {
      id
      name
    }
  }
`;

export default function TagList(props) {
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

  const [DeleteTag, { data, loading, error }] = useMutation(DELETE_TAG);

  if (error) {
    toast('Oops an error occurred');
  }
  if (!error && !loading && data) {
    // TODO add some checks and toast id of tag id to prevent default msgs
    toast('Tag deleted');
  }

  const { ...result } = useQuery(GET_TAGS, {
    variables,
    // pollInterval: 3500,
  });
  const dataQ = result.data;

  // console.log(data);

  if (!dataQ) {
    return <p>Loading</p>;
  }

  return (
    <TagListStyles>
      <p>
        Initially you have the option to delete tags. Once they have been
        assigned to question(s) or voted on you may not delete them.
      </p>
      <ul>
        {dataQ.Tag.map((t, i) => {
          return (
            <li key={t.id}>
              {t.name} votes from everyone:{' '}
              {t.voteCountCache ? t.voteCountCache : 0}{' '}
              {props.userAddress &&
                t.questions.length === 0 &&
                (t.voteCountCache === 0 || !t.voteCountCache) && (
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      DeleteTag({
                        variables: { id: t.id },
                        refetchQueries: ['GET_TAGS'],
                      });
                    }}
                  >
                    delete me
                  </a>
                )}
            </li>
          );
        })}
      </ul>
    </TagListStyles>
  );
}
