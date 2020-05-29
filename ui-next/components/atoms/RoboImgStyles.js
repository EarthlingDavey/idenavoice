import styled from 'styled-components';

const RoboImgStyles = styled.img`
  /* border: 5px solid tomato; */
  /* border-radius: 50%; */
  overflow: hidden;
  transition: 500ms ease filter;
  filter: grayscale(100%);
  /* background-color: #000; */
  border: 5px solid #ddd;

  /* border-left-color: blue; */

  &:hover {
    filter: grayscale(0%);
  }
`;

module.exports = {
  RoboImgStyles,
};
