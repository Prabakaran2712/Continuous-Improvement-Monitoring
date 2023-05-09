import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import Styles from "./SendButton.module.css";
const SendButton = (props) => {
  return (
    <button
      className={`${Styles.button} ${Styles.success} `}
      onClick={props.onClick}
    >
      <FontAwesomeIcon
        icon={faPaperPlane}
        size="sm"
        className={` ${Styles.icon} ` + (props.loading ? Styles.animation : "")}
      />
    </button>
  );
};

export default SendButton;
