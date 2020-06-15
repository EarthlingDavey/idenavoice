import React, { Component } from 'react';
import { toast } from 'react-toastify';

import CreatableSelect from 'react-select/creatable';
// import { colourOptions } from '../data';
import Tag from '../atoms/Tag';
import { TagListStyles } from '../atoms/TagStyles';

const Svg = ({ size, ...props }) => (
  <svg
    height={size}
    width={size}
    viewBox="0 0 20 20"
    aria-hidden="true"
    focusable="false"
    css={{
      display: 'inline-block',
      fill: 'currentColor',
      lineHeight: 1,
      stroke: 'currentColor',
      strokeWidth: 0,
    }}
    {...props}
  />
);

const CrossIcon = (props) => (
  <Svg size={20} {...props}>
    <path d="M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z" />
  </Svg>
);

// from https://github.com/JedWatson/react-select/blob/master/packages/react-select/src/components/MultiValue.js
const MyMultiValueRemove = ({ children, innerProps, data }) => {
  if (data && data.clearable === false) {
    return null;
  }
  return <div {...innerProps}>{children || <CrossIcon size={14} />}</div>;
};
const MyClearIndicator = ({ children, innerProps, data }) => {
  return null;
};

export default class CreatableMulti extends Component {
  prepOptions = (options, questionTags) => {
    console.log({ questionTags });
    let newOptions = [];
    for (let i = 0; i < options.length; i++) {
      const o = options[i];
      // console.log(o);
      newOptions.push({
        value: o.id,
        label: o.name,
        clearable:
          questionTags && questionTags.findIndex((obj) => obj.id === o.id) >= 0
            ? false
            : true,
      });
    }
    return newOptions;
  };

  state = {
    selected: this.props.questionTags
      ? this.prepOptions(this.props.questionTags, this.props.questionTags)
      : [],
    showSelect: false,
    explodeTag: '',
  };

  handleChange = (newValue, actionMeta) => {
    // console.group('Value Changed');
    // console.log(newValue);
    // console.log(`action: ${actionMeta.action}`);
    // console.groupEnd();
    this.setState({ selected: newValue });
    this.props.handleTagChange(newValue, this.state.selected);
  };

  handleCreate = (inputValue) => {
    toast('Go to your account to create tags.');
    return false;
  };

  toggleSelect = (e) => {
    e.preventDefault();
    this.setState({ showSelect: !this.state.showSelect });
  };

  toggleTag = (e, id) => {
    console.log(e);
    console.log(id);
    e.preventDefault();
    if (this.state.explodeTag === id) {
      this.setState({ explodeTag: '' });
    } else {
      this.setState({ explodeTag: id });
    }
    // this.setState({ showSelect: !this.state.showSelect });
  };

  render() {
    console.log(this.props.questionTags);
    if (!this.props.allTags || !this.props.allTags.length) {
      return null;
    }
    return (
      <>
        <TagListStyles>
          {this.props.questionTags.map((t, i) => {
            return (
              <Tag
                explode={this.state.explodeTag === t.id}
                as="a"
                onClick={(e) => this.toggleTag(e, t.id)}
                key={t.id}
                name={t.name}
                signedIn={this.props.signedIn}
              ></Tag>
            );
          })}
          {this.props.signedIn && !this.state.showSelect && (
            <a onClick={this.toggleSelect} href="">
              {this.props.questionTags.length
                ? 'assign more tags'
                : 'assign a tag'}
            </a>
          )}
          {!this.props.signedIn && <a>sign in to add tags</a>}
          {this.state.showSelect && (
            <a onClick={this.toggleSelect} href="">
              ok
            </a>
          )}
        </TagListStyles>
        {this.state.showSelect && (
          <CreatableSelect
            placeholder={'tags...'}
            components={{
              MultiValueRemove: MyMultiValueRemove,
              ClearIndicator: MyClearIndicator,
            }}
            value={this.state.selected}
            isMulti
            onChange={this.handleChange}
            options={this.prepOptions(
              this.props.allTags,
              this.props.questionTags
            )}
            onCreateOption={this.handleCreate}
          />
        )}
      </>
    );
  }
}
