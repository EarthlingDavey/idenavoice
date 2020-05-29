import Link from 'next/link';
import { SortFilterBarStyles } from './SortFilterBarStyles';
import Select from '../atoms/Select';
import { SelectStyles } from '../atoms/SelectStyles';
import Checkbox from '../atoms/CheckboxInput';
import { CheckboxInputStyles } from '../atoms/CheckboxInputStyles';

export default function SortFilterBarQuestion(props) {
  return (
    <SortFilterBarStyles
      SelectStyles={SelectStyles}
      CheckboxInputStyles={CheckboxInputStyles}
    >
      <h3>Filter and Sort </h3>
      <Checkbox name={'reported'} checked={true} readOnly={true}>
        Show <br />
        old
      </Checkbox>
      <Checkbox name={'validated'} checked={false} readOnly={true}>
        Responses from validated
        <br /> identities only
      </Checkbox>
    </SortFilterBarStyles>
  );
}
