import { ButtonStyles } from './ButtonStyles';

const ButtonQuestion = (props) => {
  return (
    <ButtonStyles
      onClick={props.handleClick}
      target={props.target}
      as="a"
      href={props.href}
    >
      {props.children}
    </ButtonStyles>
  );
};

export default ButtonQuestion;
