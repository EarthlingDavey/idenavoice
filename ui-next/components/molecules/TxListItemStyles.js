import styled, { css } from 'styled-components';

const TxListItemStyles = styled.div`
  /* outline: 1px solid lime; */
  margin-bottom: 1em;
  font-size: 17px;

  .row {
    display: flex;
  }

  .left {
    display: flex;
    align-items: flex-start;
    margin-right: 0.3em;
    margin-bottom: 0.5em;
    a {
      display: inline-block;
      width: 50px;
      min-width: 50px;
      height: 50px;
    }
    .icons {
      display: inline-flex;
    }
  }

  .right {
    margin-bottom: 0.5em;
    align-self: center;
    flex: 1 1 0;
    min-width: 0;

    a {
      color: inherit;
      vertical-align: baseline;
    }
    time {
      vertical-align: baseline;
    }
    span {
      display: inline-block;
      vertical-align: middle;
      max-width: 100%;
    }
  }
`;

module.exports = { TxListItemStyles };
