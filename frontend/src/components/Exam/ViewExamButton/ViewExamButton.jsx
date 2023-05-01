import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import Styles from "./ViewExamButton.module.css";
const ViewExamButton = (props) => {
  return (
    <button className={`${Styles.btn}`} onClick={props.onClick}>
      <FontAwesomeIcon
        icon={props.icon ? props.icon : faEye}
        size={"2xl"}
        className={`${Styles.icon}`}
      />
    </button>
  );
};

export default ViewExamButton;
