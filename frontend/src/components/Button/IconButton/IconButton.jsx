import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Styles from "./IconButton.module.css";
const IconButton = (props) => {
  return (
    <button className={`${Styles.btn}`} onClick={props.onClick}>
      <FontAwesomeIcon
        icon={props.icon}
        size={"1x"}
        className={`${Styles.icon}`}
      />
    </button>
  );
};

export default IconButton;
