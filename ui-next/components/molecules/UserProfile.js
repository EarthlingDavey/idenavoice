import { UserProfileStyles } from './UserProfileStyles';
import RoboImg from '../atoms/RoboImg';
import { MonoStyles } from '../atoms/MonoStyles';

export default function UserProfile(props) {
  return (
    <UserProfileStyles>
      <RoboImg address={props.user.address}></RoboImg>
      <dl>
        <dt>Address</dt>
        <dd>
          <MonoStyles>{props.user.address}</MonoStyles>
        </dd>
        <dt>Age</dt>
        <dd>
          <MonoStyles>{props.user.age}</MonoStyles>
        </dd>
        <dt>State</dt>
        <dd>
          <MonoStyles>{props.user.state}</MonoStyles>
        </dd>
      </dl>
    </UserProfileStyles>
  );
}
