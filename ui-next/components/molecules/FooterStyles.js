import styled, { css } from 'styled-components';

const FooterStyles = styled.footer`
  position: relative;
  z-index: 1;

  .dummy {
    position: relative;
    min-height: ${(props) => (props.height ? props.height + 'px' : '50vh')};
    z-index: -1;
  }

  .wrap {
    position: fixed;
    bottom: 0;
    width: 100%;
    /* z-index: 1; */

    margin: 0 auto;
    padding: 1em 10px;
    display: flex;
    flex-direction: row;
    align-items: stretch;
    /* max-width: 1200px; */
    width: 100%;
    max-height: 100%;
    min-height: 50vh;
    /* position: relative; */
    background-color: #fff;

    @media (max-width: 1000px) {
      max-width: 640px;
      flex-wrap: wrap;
      margin: 0 auto;
    }

    align-items: center;
    justify-content: center;
  }

  a {
    color: inherit;
  }
`;

module.exports = { FooterStyles };
