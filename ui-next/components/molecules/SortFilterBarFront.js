import React, { useState } from 'react';

import { SortFilterBarStyles } from './SortFilterBarStyles';
import Tag from '../atoms/Tag';

export default function SortFilterBarFront(props) {
  let selectedTags = props.selectedTags;

  if (props.tags && props.tags.length) {
    return (
      <SortFilterBarStyles>
        <ul>
          {props.tags.map((t, i) => {
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
