import React, { useState } from 'react';
import Link from 'next/link';
import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { SortFilterBarStyles } from './SortFilterBarStyles';
import Select from '../atoms/Select';
import { SelectStyles } from '../atoms/SelectStyles';
import Checkbox from '../atoms/CheckboxInput';
import Tag from '../atoms/Tag';
import { CheckboxInputStyles } from '../atoms/CheckboxInputStyles';

const GET_TAGS = gql`
  query GET_TAGS {
    Tag(orderBy: voteCountCache_desc, first: 3) {
      id
      name
    }
  }
`;

function toggler(collection, item) {
  if (!collection) {
    return [item];
  }
  var idx = collection.indexOf(item);
  if (idx !== -1) {
    collection.splice(idx, 1);
  } else {
    collection.push(item);
  }
  return collection;
}

export default function SortFilterBarFront(props) {
  const { data, loading, error } = useQuery(GET_TAGS, {
    variables: {},
    // pollInterval: 3500,
    // onCompleted: setTagData,
  });
  let selectedTags = props.selectedTags;
  if (props.selectedTags.length === 0 && data && data.Tag.length > 0) {
    selectedTags = data.Tag[0].id;
  }
  if (data && data.Tag && data.Tag.length) {
    return (
      <SortFilterBarStyles
        SelectStyles={SelectStyles}
        CheckboxInputStyles={CheckboxInputStyles}
      >
        <ul>
          {data.Tag.map((t, i) => {
            return (
              <Tag
                onClick={(e) => props.handleTagClick(e, t.id)}
                as="li"
                name={t.name}
                key={t.id}
                selected={selectedTags.includes(t.id) ? true : false}
              ></Tag>
            );
          })}
        </ul>
      </SortFilterBarStyles>
    );
  } else {
    return <p>Not tags have been created yet</p>;
  }
}
