import { TagStyles } from './TagStyles';

export default function Tag(props) {
  // const [ActionOnTag, { data }] = useMutation(ADD_QUESTION_TAGS);

  return (
    <TagStyles>
      <a className="label" onClick={props.onClick}>
        #{props.name}
      </a>
      {props.explode && (
        <div className="tag-popup">
          #{props.name}
          {props.signedIn && (
            <>
              <br />
              <a href="">tag is relevant 🔼</a>
              <br></br>
              <a href="">tag is not relevant 🔽</a>
            </>
          )}
          {!props.signedIn && (
            <>
              <br />
              <span>Sign in to say if this tag is relevant</span>
            </>
          )}
          <a href="" onClick={props.onClick} className="close">
            x
          </a>
        </div>
      )}
    </TagStyles>
  );
}
