import styled from 'styled-components';

const TextareaStyles = styled.textarea`
  margin-top: -0.1em;
  color: #afafaf;
  font-size: 76px;
  width: 100%;
  min-width: 100%;
  border: 0;
  font-weight: inherit;
  font-family: inherit;
  line-height: 1;
  @media (max-width: 1000px) {
    margin-top: 0;
    font-size: 18px;
    min-height: 100px;
  }

  ::placeholder {
    color: #ddd;
  }
`;

module.exports = { TextareaStyles };
