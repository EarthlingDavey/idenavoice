import styled, { css } from 'styled-components';

const HeaderStyles = styled.header`
  margin: 0 auto;
  padding: 0.1em 10px;
  top: 0;
  display: flex;
  min-height: 3em;
  flex-direction: row;
  align-items: center;
  max-width: 1200px;
  width: 100%;
  background-color: #fff;
  z-index: 10;
  @media (min-width: 999px) {
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
  }
  @media (max-width: 1000px) {
    position: sticky;
    max-width: 640px;
    flex-wrap: wrap;
    margin: 0 auto;
  }

  .left {
    display: flex;
    align-items: flex-end;
    @media (max-width: 640px) {
      flex-wrap: wrap;
    }
  }

  h1 {
    margin: 0;
    padding: 0;
    display: inline-flex;
    font-weight: 900;
    line-height: 1;
    font-size: 100%;
    a {
      color: inherit;
      text-decoration: none;
    }
  }

  ul {
    margin: 0;
    padding: 0;
    display: inline-flex;
    margin-left: 1em;
    line-height: 1;
  }

  .right {
    margin-left: auto;

    a {
      color: inherit;
      text-decoration: none;
      text-transform: uppercase;
      font-weight: 900;
      vertical-align: middle;
    }

    a.profile {
      display: inline-block;
      width: 50px;
      min-width: 50px;
      height: 50px;
      margin-right: 8px;
    }
  }

  li {
    font-size: 0.8em;
    position: relative;
    display: inline-flex;
    padding-right: 0.5em;
    margin-right: 0.5em;
    transform: translateY(-6.25%);

    /* margin-left: 1em; */
    a {
      font-weight: 900;
      text-transform: uppercase;
      text-decoration: none;
      color: #ddd;
      vertical-align: baseline;
    }
    &:after {
      position: absolute;
      right: -2px;
      content: '';
      width: 3px;
      top: 1px;
      bottom: 1px;
      background-color: #ddd;
    }
    &:last-of-type {
      &:after {
        display: none;
      }
    }
  }
`;

module.exports = { HeaderStyles };
