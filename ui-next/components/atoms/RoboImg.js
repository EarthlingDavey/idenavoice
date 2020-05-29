import { RoboImgStyles } from './RoboImgStyles';

export default function RoboImg(props) {
  return (
    <RoboImgStyles
      userState={props.userState}
      src={`https://robohash.org/${props.address}?size=150x150`}
      alt=""
    />
  );
}
