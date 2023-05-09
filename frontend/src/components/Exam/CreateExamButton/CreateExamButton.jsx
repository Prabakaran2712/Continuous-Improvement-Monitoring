import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import Styles from "./CreateExamButton.module.css";
const CreateExamButton = (props) => {
  return (
    <button className={`${Styles.btn}`} onClick={props.onClick}>
      <FontAwesomeIcon
        icon={faPlusCircle}
        rotation={270}
        size={"2xl"}
        className={`${Styles.icon}`}
      />
    </button>
  );
};

export default CreateExamButton;
