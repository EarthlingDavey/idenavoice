import Link from 'next/link';
import { SortFilterBarStyles } from './SortFilterBarStyles';
import Select from '../atoms/Select';
import { SelectStyles } from '../atoms/SelectStyles';
import Checkbox from '../atoms/CheckboxInput';
import { CheckboxInputStyles } from '../atoms/CheckboxInputStyles';

const sortSelect = {
  name: 'orderBy',
  value: '',
  options: [
    {
      label: 'Newest first',
      value: 'timestamp_desc',
    },
    {
      label: 'Oldest first',
      value: 'timestamp_asc',
    },
    {
      label: 'Controversial',
      value: 'cont',
      disabled: true,
    },
    {
      label: 'Most answers',
      value: 'most',
      disabled: true,
    },
  ],
};

export default function SortFilterBar(props) {
  return (
    <SortFilterBarStyles
      SelectStyles={SelectStyles}
      CheckboxInputStyles={CheckboxInputStyles}
    >
      <h3>Filter and Sort </h3>
      <Checkbox
        name="userState"
        value="Newbie"
        checked={props.userState.Newbie}
        handleChange={props.handleChange}
        // disabled={true}
      >
        Show from newbies
      </Checkbox>
      <Checkbox
        name="userState"
        value="Verified"
        checked={props.userState.Verified}
        handleChange={props.handleChange}
        // disabled={true}
      >
        Verified
      </Checkbox>
      <Checkbox
        name="userState"
        value="Human"
        checked={props.userState.Human}
        handleChange={props.handleChange}
        // disabled={true}
      >
        Human
      </Checkbox>
      <Checkbox
        name="userState"
        value="Suspended"
        checked={props.userState.Suspended}
        handleChange={props.handleChange}
        // disabled={true}
      >
        Suspended
      </Checkbox>
      {/* <Checkbox
        name={'reported'}
        checked={props.reported}
        handleChange={props.handleChange}
        disabled={true}
      >
        Show <br />
        reported
      </Checkbox> */}
      <Select
        {...sortSelect}
        value={props.orderBy}
        handleChange={props.handleChange}
      ></Select>
    </SortFilterBarStyles>
  );
}
