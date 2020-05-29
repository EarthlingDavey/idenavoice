import styled, { css } from 'styled-components';

const FooterStyles = styled.footer`
  margin: 0 auto;
  padding: 1em 10px;
  display: flex;
  flex-direction: row;
  align-items: stretch;
  max-width: 1200px;
  width: 100%;
  min-height: 100vh;
  position: relative;
  background-color: #fff;
  z-index: 20;

  @media (max-width: 1000px) {
    max-width: 640px;
    flex-wrap: wrap;
    margin: 0 auto;
  }

  align-items: center;
  justify-content: center;
`;

module.exports = { FooterStyles };
