import styled, { css } from 'styled-components';

const BadgesStyles = styled.div`
  text-align: center;
  span {
    /* display: block;
    @media (max-width: 1000px) {
      display: none;
    } */
  }
  .badge {
    filter: grayscale(100%);
    display: block;
    position: relative;
    padding: 2px;
    font-size: 0.8em;
    line-height: 1.1;
    font-weight: 900;
    /* font-style: italic; */
    .name {
      font-weight: 600;
      display: inline;
      position: absolute;
      background-color: #fff;
      font-size: 12px;
      overflow: hidden;
      max-width: 0;
      transition: max-width ease 500ms;
    }
    &:hover {
      filter: grayscale(0%);
      .name {
        display: inline;
        max-width: 200px;
      }
    }
  }
`;

module.exports = { BadgesStyles };
