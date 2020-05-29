import { SelectStyles } from './SelectStyles';

export default function Select(props) {
  return (
    <SelectStyles
      name={props.name}
      value={props.value}
      onChange={props.handleChange}
      readOnly={props.readOnly}
    >
      {props.options.map((option, i) => {
        return (
          <option
            key={option.value}
            value={option.value}
            disabled={option.disabled ? true : null}
          >
            {option.label}
          </option>
        );
      })}
    </SelectStyles>
  );
}
