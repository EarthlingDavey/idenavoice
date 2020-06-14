import { TagCreateStyles } from './TagStyles';
import Textarea from '../atoms/Textarea';

import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const GET_TAGS = gql`
  query GET_TAGS($filter: _TagFilter) {
    Tag(filter: $filter) {
      id
      name
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

  const { ...result } = useQuery(GET_TAGS, {
    variables,
    // pollInterval: 3500,
  });
  const [DeleteTag, { data2 }] = useMutation(DELETE_TAG);

  const data = result.data;

  // console.log(data);

  if (!data) {
    return <p>Loading</p>;
  }

  return (
    <div>
      <p>tag list</p>
      <ul>
        {data.Tag.map((t, i) => {
          return (
            <li key={t.id}>
              {t.name}{' '}
              {props.userAddress && (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    DeleteTag({
                      variables: { id: t.id },
                      refetchQueries: ['GET_TAGS'],
                    });
                  }}
                >
                  delete me
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
