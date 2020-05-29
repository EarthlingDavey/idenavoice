import { BadgesStyles } from './BadgesStyles';

const statesArray = [
  {
    name: 'Newbie',
    icon: '🔰',
  },
  {
    name: 'Verified',
    icon: '🕶',
  },
  {
    name: 'Human',
    icon: '✔️',
  },

  // 💯🔰✅🔥
];

export default function Badges(props) {
  var result = statesArray.find((obj) => {
    return obj.name === props.user.state;
  });
  return (
    <BadgesStyles>
      {result && (
        <span className="badge">
          {result.icon} <span className="name">{result.name}</span>
        </span>
      )}
      {12 < props.user.age && props.user.age < 24 && (
        <span className="badge">
          🕯️ <span className="name">12+ validations ({props.user.age})</span>
        </span>
      )}
      {24 < props.user.age && (
        <span className="badge">
          🎂 <span className="name">24+ validations ({props.user.age})</span>
        </span>
      )}
    </BadgesStyles>
  );
}
