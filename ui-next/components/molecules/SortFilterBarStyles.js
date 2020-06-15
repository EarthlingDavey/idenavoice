import styled, { css } from 'styled-components';

const SortFilterBarStyles = styled.nav`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  @media (max-width: 1000px) {
    justify-content: flex-start;
    flex-wrap: wrap;
  }

  h3 {
    margin-top: 0.2em;
    margin-bottom: 0.2em;
    margin-right: auto;
    text-transform: uppercase;
    font-weight: 900;
    @media (max-width: 1000px) {
      width: 100%;
    }
  }

  ${(props) =>
    props.CheckboxInputStyles &&
    css`
      ${props.CheckboxInputStyles} {
        margin-right: 2em;
        padding-left: 2em;
        font-size: 17px;
        min-height: 30px;

        @media (max-width: 1000px) {
          width: 100%;
        }

        input {
          ~ i.checkbox {
            font-size: 30px;
          }
        }
      }
    `}
  ${(props) =>
    props.SelectStyles &&
    css`
      ${props.SelectStyles} {
        margin-bottom: 0.3em;
        max-width: 300px;
        font-size: 17px;
      }
    `};
`;

module.exports = { SortFilterBarStyles };
