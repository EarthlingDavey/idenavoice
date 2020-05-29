import styled, { css } from 'styled-components';

const TitleWrapper = styled.div`
  flex-shrink: 0;
  margin-bottom: 1em;
  max-width: 100%;
  padding: 0 10px;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 0 10px;
  /* padding-left: 1em;  */
  margin-bottom: 1em;
  position: ${(props) => (props.hasQuestions ? 'relative' : null)};

  max-width: ${(props) => (props.maxWidth ? props.maxWidth : `100%`)};

  h1, h2, h3, p {

    margin-top: 16px;
    margin-bottom: 16px;
    padding: 0;
  }
  ol, ul, p {
    margin-top: 0;
  }

  ul {
    padding-left: 1.5em;
  }

  @media (max-width: 1000px) {
    order: 2;
    min-width: 100%;
  }

  ${(props) =>
    props.SelectStyles &&
    css`
      ${props.SelectStyles} {
        margin-bottom: 0.2em;
        font-size: 46px;
        @media (max-width: 1000px) {
          margin-bottom: 0.6em;
          font-size: 18px;
        }
      }
    `}

  ${(props) =>
    props.CheckboxInputStyles &&
    css`
      ${props.CheckboxInputStyles} {
        margin-bottom: 0.4em;
        font-size: 46px;
        @media (max-width: 1000px) {
          margin-bottom: 1em;
          font-size: 18px;
        }
      }
    `}

  ${(props) =>
    props.ButtonStyles &&
    css`
      ${props.ButtonStyles} {
        /* background-color: tomato; */
      }
    `}

  .lower {
    margin-top: auto;
    @media (max-width: 1000px) {
      margin-top: 1em;
    }
  }
`;

// Create a Wrapper component that'll render a <section> tag with some styles
const Wrapper = styled.section`
  /* outline: 2px solid tomato; */
  display: ${(props) => (props.stack ? 'block' : 'flex')};
  flex-wrap: ${(props) => (props.wrap ? 'wrap' : null)};
  margin: 6.5em auto;
  flex-direction: row;
  align-items: stretch;
  max-width: 1200px;
  width: 100%;
  scroll-margin-top: 5em;

  @media (max-width: 1000px) {
    max-width: 640px;
    flex-wrap: wrap;
    margin: 2em auto 3em;
  }

  > div {
    /* max-width: 100%; */
  }
`;

module.exports = {
  TitleWrapper,
  ContentWrapper,
  Wrapper,
};
