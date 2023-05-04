import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import Styles from "./UpdateButton.module.css";
const UpdateButton = (props) => {
  return (
    <button className={`${Styles.btn}`} onClick={props.onClick}>
      <FontAwesomeIcon icon={faPen} size={"2xl"} className={`${Styles.icon}`} />
    </button>
  );
};

export default UpdateButton;
