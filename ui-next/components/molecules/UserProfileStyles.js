import styled, { css } from 'styled-components';

const UserProfileStyles = styled.div`
  display: flex;
  align-items: center;
  img {
    flex-shrink: 0;
    margin-right: 16px;
    filter: grayscale(0%);
  }
`;

module.exports = { UserProfileStyles };
