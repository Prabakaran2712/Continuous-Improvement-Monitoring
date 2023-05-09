import Styles from "./Message.module.css";
const Message = (props) => {
  return (
    <div
      className={
        props.yourMessage
          ? ` ${Styles.fromMe}  ${Styles.message} `
          : ` ${Styles.fromThem}  ${Styles.message} `
      }
    >
      <pre>{props.message}</pre>
    </div>
  );
};

export default Message;
