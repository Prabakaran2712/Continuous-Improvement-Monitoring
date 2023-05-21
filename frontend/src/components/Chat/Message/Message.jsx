import Styles from "./Message.module.css";
import moment from "moment";
const Message = (props) => {
  return (
    <div
      className={
        props.yourMessage
          ? ` ${Styles.fromMe}  ${Styles.message} `
          : ` ${Styles.fromThem}  ${Styles.message} `
      }
    >
      {props.yourMessage ? (
        <div className={`${Styles.name}`}>{props.you}</div>
      ) : (
        <div className={`${Styles.name}`}>{props.other}</div>
      )}

      <div className={`${Styles.time}`}>
        {moment(props.createdAt).format("hh:mm a, MMMM Do YYYY")}
      </div>
      <hr />
      <div>
        <p>{props.message}</p>
      </div>
    </div>
  );
};

export default Message;
