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
    Tag(orderBy: voteCountCache_desc) {
      id
      name
    }
  }
`;

const sortSelect = {
  name: 'orderBy',
  value: '',
  options: [
    {
      label: 'Newest first',
      value: 'timestamp_desc',
    },
    {
      label: 'Oldest first',
      value: 'timestamp_asc',
    },
    {
      label: 'Controversial',
      value: 'cont',
      disabled: true,
    },
    {
      label: 'Most answers',
      value: 'most',
      disabled: true,
    },
  ],
};

export default function SortFilterBar(props) {
  const { data, loading, error } = useQuery(GET_TAGS, {
    variables: {},
    // pollInterval: 3500,
    // onCompleted: setTagData,
  });

  // console.log(selectedTags);

  console.log(data);

  return (
    <>
      <SortFilterBarStyles
        SelectStyles={SelectStyles}
        CheckboxInputStyles={CheckboxInputStyles}
      >
        <h3>Filter and Sort </h3>
        <Checkbox
          name="userState"
          value="Newbie"
          checked={props.userState.Newbie}
          handleChange={props.handleChange}
          // disabled={true}
        >
          Show from newbies
        </Checkbox>
        <Checkbox
          name="userState"
          value="Verified"
          checked={props.userState.Verified}
          handleChange={props.handleChange}
          // disabled={true}
        >
          Verified
        </Checkbox>
        <Checkbox
          name="userState"
          value="Human"
          checked={props.userState.Human}
          handleChange={props.handleChange}
          // disabled={true}
        >
          Human
        </Checkbox>
        <Checkbox
          name="userState"
          value="Suspended"
          checked={props.userState.Suspended}
          handleChange={props.handleChange}
          // disabled={true}
        >
          Suspended
        </Checkbox>
        {/* <Checkbox
        name={'reported'}
        checked={props.reported}
        handleChange={props.handleChange}
        disabled={true}
      >
        Show <br />
        reported
      </Checkbox> */}
        <Select
          {...sortSelect}
          value={props.orderBy}
          handleChange={props.handleChange}
        ></Select>
      </SortFilterBarStyles>
      {data && data.Tag && data.Tag.length !== 0 && (
        <SortFilterBarStyles
          SelectStyles={SelectStyles}
          CheckboxInputStyles={CheckboxInputStyles}
        >
          <h3>Tags </h3>
          <ul>
            {data.Tag.map((t, i) => {
              return (
                <Tag
                  onClick={(e) => props.handleTagClick(e, t.id)}
                  as="li"
                  name={t.name}
                  key={t.id}
                  selected={props.selectedTags.includes(t.id) ? true : false}
                ></Tag>
              );
            })}
          </ul>
        </SortFilterBarStyles>
      )}
      {data && data.Tag && data.Tag.length === 0 && (
        <SortFilterBarStyles
          SelectStyles={SelectStyles}
          CheckboxInputStyles={CheckboxInputStyles}
        >
          <h3>Tags </h3>
          <p>Not tags have been created yet</p>
        </SortFilterBarStyles>
      )}
    </>
  );
}
