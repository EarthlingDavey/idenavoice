import { TextareaStyles } from './TextareaStyles';

const Textarea = (props) => {
  return (
    <TextareaStyles
      name={props.name}
      value={props.value}
      placeholder={props.placeholder}
      onChange={props.handleChange}
    ></TextareaStyles>
  );
};

export default Textarea;
