import styled from 'styled-components';

const ButtonStyles = styled.button`
  border: 7px solid #000000;
  color: inherit;
  display: inline-block;
  cursor: pointer;
  span {
    font-weight: 900;
    font-size: 123px;
    display: inline-block;
    line-height: 0.8;
    line-height: 0.8;
    @media (max-width: 1000px) {
      font-size: 48px;
    }
  }
`;

const ButtonGroupStyles = styled.div`
  /* border: 7px solid #000000; */
  margin-left: -10px;
  font-size: 30px;
  ${ButtonStyles} {
    margin-bottom: 10px;
    margin-left: 10px;
    margin-right: 10px;
    border-width: 4px;
    span {
      font-size: 30px;
    }
  }
`;

module.exports = {
  ButtonStyles,
  ButtonGroupStyles,
};
