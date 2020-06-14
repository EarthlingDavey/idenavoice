import React from 'react';
import { toast } from 'react-toastify';
import { spareCredits } from '../../lib/utils';

import Button from '../atoms/Button';
import { ButtonStyles, ButtonGroupStyles } from '../atoms/ButtonStyles';
import { TagVotingStyles } from './TagStyles';

let toasts = {};

class TagVotingInner extends React.Component {
  state = {
    tags: this.props.initialTags,
  };

  handleChange = (e) => {
    const { name, type, value } = e.target;

    let tags = this.state.tags;

    //find the index of object from array that you want to update
    const objIndex = tags.findIndex((obj) => obj.id === name);

    // make new object of updated object.
    const updatedObj = { ...tags[objIndex], qty: value };

    // make final new array of objects by combining updated object.
    const updatedTags = [
      ...tags.slice(0, objIndex),
      updatedObj,
      ...tags.slice(objIndex + 1),
    ];

    // console.log(updatedTags);

    const spareVoteCredits = spareCredits(updatedTags);

    // console.log(spareVoteCredits);

    if (spareVoteCredits >= 0) {
      this.setState({ tags: updatedTags });
      if (toast.isActive(toasts.maxed)) {
        toast.dismiss(toasts.maxed);
      }
    } else {
      // notify
      if (!toast.isActive(toasts.maxed)) {
        toasts.maxed = toast(
          'You maxed out your credits, free some up by decreasing some of your votes.'
        );
      }
    }
  };

  render() {
    let spareVoteCredits = spareCredits(this.state.tags);

    return (
      <TagVotingStyles ButtonStyles={ButtonStyles}>
        <p>Spare credits: {spareVoteCredits}</p>
        <ul>
          {this.state.tags.map((t, i) => {
            return (
              <li key={t.id}>
                {t.name} <span>vote</span>{' '}
                <div>
                  <input
                    name={t.id}
                    type="range"
                    min="0"
                    max="10"
                    value={t.qty}
                    onChange={this.handleChange}
                  />
                  <span>Votes: {t.qty}</span>
                  <span>Uses credits: {Math.pow(t.qty, 2)}</span>
                </div>
              </li>
            );
          })}
        </ul>
        <Button onClick={() => this.props.votingMutation(this.state.tags)}>
          <span>Submit</span>
        </Button>
      </TagVotingStyles>
    );
  }
}

export default TagVotingInner;
