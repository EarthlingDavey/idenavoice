import { BigHeadingStyles } from './BigHeadingStyles';

const BigHeading = (props) => {
  return (
    <BigHeadingStyles align={props.align}>{props.children}</BigHeadingStyles>
  );
};

export default BigHeading;
