import { TextareaStyles } from './TextareaStyles';

const Textarea = (props) => {
  const handleKeydown = (e) => {
    e.stopPropagation();
  };

  return (
    <TextareaStyles
      disabled={props.disabled}
      as={props.as}
      name={props.name}
      value={props.value}
      placeholder={props.placeholder}
      onChange={props.handleChange}
      ref={props.passRef ? props.passRef : null}
      onKeyDown={handleKeydown}
    ></TextareaStyles>
  );
};

export default Textarea;
