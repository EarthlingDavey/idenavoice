import React, { useState, useEffect } from 'react';
import QuestionsBlock from './QuestionsBlock';
import SortFilterBarFront from './SortFilterBarFront';

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.handleTagClick = this.handleTagClick.bind(this);
  }

  state = {
    selectedTags: [this.props.tags[0].id],
  };

  handleTagClick(e, tagId) {
    this.setState((prevState) => ({
      selectedTags: [tagId],
    }));
  }

  render() {
    return (
      <>
        <QuestionsBlock
          tags={this.props.tags}
          selectedTags={this.state.selectedTags}
        >
          <SortFilterBarFront
            handleTagClick={this.handleTagClick}
            tags={this.props.tags}
            selectedTags={this.state.selectedTags}
          ></SortFilterBarFront>
        </QuestionsBlock>
      </>
    );
  }
}

export default Question;
