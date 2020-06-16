import React, { useState, useEffect } from 'react';
import QuestionsBlock from './QuestionsBlock';
import SortFilterBarFront from './SortFilterBarFront';

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.handleTagClick = this.handleTagClick.bind(this);
  }

  state = {
    selectedTags: [],
  };

  handleTagClick(e, tagId) {
    if (e) {
      e.preventDefault();
    }
    console.log(e, tagId);

    this.setState((prevState) => ({
      selectedTags: [tagId],
    }));
  }

  render() {
    return (
      <>
        <QuestionsBlock selectedTags={this.state.selectedTags}>
          <SortFilterBarFront
            handleTagClick={this.handleTagClick}
            selectedTags={this.state.selectedTags}
          ></SortFilterBarFront>
        </QuestionsBlock>
      </>
    );
  }
}

export default Question;
