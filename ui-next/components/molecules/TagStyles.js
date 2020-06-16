import styled, { css } from 'styled-components';

const TagCreateStyles = styled.div`
  /* display: flex;
  align-items: center; */
`;

const TagVotingStyles = styled.div`
  /* display: flex; */
  /* align-items: center; */
  ${(props) =>
    props.ButtonStyles &&
    css`
      ${props.ButtonStyles} {
        text-transform: uppercase;
        /* border-color: #afafaf; */
        border-width: 3px;
        span {
          font-size: 17px;
        }
      }
    `}
`;

module.exports = { TagCreateStyles, TagVotingStyles };
