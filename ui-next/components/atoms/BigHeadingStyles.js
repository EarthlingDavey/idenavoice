import styled, { css } from 'styled-components';

const BigHeadingStyles = styled.h1`
  margin: 0;
  font-size: 200px;
  line-height: 0.8;
  font-weight: 900;

  text-align: ${(props) => (props.align ? props.align : null)};

  /* text-align: justify; */
  @media (max-width: 1000px) {
    font-size: 30px;
    line-height: 0.8;
  }
  /* text-justify: inter-character; */
  span {
    display: block;
    @media (max-width: 1000px) {
      display: none;
    }
  }
`;

module.exports = { BigHeadingStyles };
