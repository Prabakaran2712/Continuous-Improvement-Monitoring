import Styles from "./Message.module.css";
const Message = (props) => {
  return (
    <div
      className={
        props.yourMessage
          ? `${Styles.sb4} ${Styles.fromMe}  ${Styles.message} `
          : `${Styles.sb3} ${Styles.fromThem}  ${Styles.message} `
      }
    >
      <pre>{props.message}</pre>
    </div>
  );
};

export default Message;
