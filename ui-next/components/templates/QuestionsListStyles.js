import styled, { css } from 'styled-components';
import { Wrapper } from '../organisms/AskRowStyles';

const QuestionsListStyles = styled(Wrapper)`
  flex-direction: column;
  padding: 1em 10px;

  .scrolling-x-lg {
    @media (min-width: 999px) {
      max-width: 100vw;
      margin-left: -10px;
      margin-right: -10px;
      overflow-x: auto;
      overflow-y: hidden;
    }
  }

  /* ${(props) =>
    props.BigHeadingStyles &&
    css`
      ${props.BigHeadingStyles} {
        @media (min-width: 999px) {
          /* margin-left: -0.05em;
          margin-right: -0.5em; */
        }
      }
    `}; */
`;

module.exports = { QuestionsListStyles };
