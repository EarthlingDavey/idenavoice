import styled from 'styled-components';

const TagListStyles = styled.div`
  margin-bottom: 0.2em;
  font-size: 11px;
  position: relative;

  a.more {
    margin-left: 0.4em;
    color: inherit;
  }
`;

const TagStyles = styled.span`
  /* position: relative; */
  /* font-family: 'Lucida Console', Monaco, monospace; */
  display: inline-flex;
  padding: 0.1em 0.4em;
  margin-right: 0.5em;
  margin-bottom: 0.5em;
  color: #000;

  &:last-of-type{
    margin-right: 0;
  }
  /* background: #ddd; */
  /* overflow-x: auto; */

  border: 3px solid #ddd;
  background-color: ${(props) => (props.selected ? '#ddd' : 'white')};
  /* border-color: ${(props) => (props.selected ? '#ddd' : 'pink')}; */

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
