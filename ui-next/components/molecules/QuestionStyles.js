import styled, { css } from 'styled-components';

const QuestionStyles = styled.div`
  ${(props) =>
    props.ButtonGroupStyles &&
    css`
      ${props.ButtonGroupStyles} {
        font-size: 17px;
      }
    `}

  ${(props) =>
    props.ButtonStyles &&
    css`
      ${props.ButtonStyles} {
        text-transform: uppercase;
        border-color: #afafaf;
        span {
          font-size: 17px;
        }
      }
    `}
`;
const QuestionsStyles = styled.div`
  /* outline: 1px solid tomato; */
  @media (min-width: 999px) {
    position: absolute;
    top: 0;
    left: 10px;
    right: 10px;
    height: 100%;
    overflow: auto;
  }

  ${(props) =>
    props.ButtonGroupStyles &&
    css`
      ${props.ButtonGroupStyles} {
        @media (min-width: 999px) {
          position: sticky;
          bottom: 0;
          /* width: 100%; */
          background-color: #fff;
        }
      }
    `}
  ${(props) =>
    props.SortFilterBarStyles &&
    css`
      ${props.SortFilterBarStyles} {
        justify-content: flex-start;
        ul {
          padding: 0;
          margin: 0;
        }
      }
    `}
`;

module.exports = { QuestionStyles, QuestionsStyles };
