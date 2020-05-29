import styled from 'styled-components';

const InternalLinkStyles = styled.a`
  display: inline;
  color: inherit;
  text-decoration: none;
  background-image: linear-gradient(to right, #ddd 0%, #ddd 100%);
  background-position: 0 0.85em;
  background-repeat: repeat-x;
  background-size: 8px 5px;
`;

module.exports = {
  InternalLinkStyles,
};
