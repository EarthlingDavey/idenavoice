import styled from 'styled-components';

const TagListStyles = styled.div`
  margin-bottom: 0.2em;
  font-size: 11px;
  position: relative;
`;

const TagStyles = styled.span`
  /* position: relative; */
  /* font-family: 'Lucida Console', Monaco, monospace; */
  display: inline-flex;
  padding: 0.2em 0.7em;
  margin-right: 0.5em;
  margin-bottom: 0.5em;
  color: #000;
  background: #ddd;
  /* overflow-x: auto; */

  .tag-popup {
    position: absolute;
    z-index: 20;
    top: 100%;
    padding: 0.1em 1em 0.1em 0.3em;
    background: #fff;
    border: 5px solid #000;
    box-shadow: 5px 5px 0px 0px #ddd;
    font-size: 17px;

    .close {
      position: absolute;
      top: 2px;
      right: 2px;
    }
  }
`;

module.exports = {
  TagStyles,
  TagListStyles,
};
