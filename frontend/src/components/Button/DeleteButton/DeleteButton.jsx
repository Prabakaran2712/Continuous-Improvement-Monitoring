import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Styles from "./DeleteButton.module.css";
const DeleteButton = (props) => {
  return (
    <button className={`${Styles.btn}`} onClick={props.onClick}>
      <FontAwesomeIcon
        icon={faTrash}
        size={"2xl"}
        className={`${Styles.icon}`}
      />
    </button>
  );
};

export default DeleteButton;
