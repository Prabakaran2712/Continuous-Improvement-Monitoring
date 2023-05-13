import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import Styles from "./CreateButton.module.css";
const CreateButton = (props) => {
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

export default CreateButton;
