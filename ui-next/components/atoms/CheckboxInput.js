import { CheckboxInputStyles } from './CheckboxInputStyles';

export default function CheckboxInput(props) {
  return (
    <CheckboxInputStyles>
      <input
        type="checkbox"
        name={props.name}
        value={props.value}
        checked={props.checked}
        onChange={props.handleChange}
        readOnly={props.readOnly}
        disabled={props.disabled}
      />
      <i className="checkbox"></i>
      {props.children}
    </CheckboxInputStyles>
  );
}
