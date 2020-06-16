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
        {props.user.age && (
          <>
            <dt>Age</dt>
            <dd>
              <MonoStyles>{props.user.age}</MonoStyles>
            </dd>
          </>
        )}
        {props.user.state && (
          <>
            <dt>State</dt>
            <dd>
              <MonoStyles>{props.user.state}</MonoStyles>
            </dd>
          </>
        )}
        {props.user.limits && (
          <>
            <dt>Account freedom</dt>
            {props.user.limits.map((l, i) => {
              return (
                <dd key={l.name}>
                  <MonoStyles>
                    {l.name} {l.number}
                  </MonoStyles>
                </dd>
              );
            })}
          </>
        )}
      </dl>
    </UserProfileStyles>
  );
}
