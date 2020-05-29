import styled from 'styled-components';

const size = 0.47;
const h = size * 2 * 0.866;

const LogoStyles = styled.div`
  display: inline-flex;
  margin-right: 0.5em;
  /* margin-right: -0.5em; */
  /* height: 1em;
  width: 1em; */
  /* background: #000; */

  /* font-size: 10px; */

  width: 0;
  height: 0;
  border-left: ${size + 'em solid transparent'};
  border-right: ${size + 'em solid transparent'};

  border-top: ${h + 'em solid black'};
`;

module.exports = {
  LogoStyles,
};
