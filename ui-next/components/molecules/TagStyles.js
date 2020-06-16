import styled, { css } from 'styled-components';

const TagCreateStyles = styled.div`
  /* display: flex;
  align-items: center; */
`;
const TagListStyles = styled.div`
  a {
    font-size: 11px;
    color: inherit;
    vertical-align: middle;
  }
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

module.exports = { TagCreateStyles, TagListStyles, TagVotingStyles };
