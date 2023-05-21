import Styles from "./ChatCard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@mui/material";

const ChatCard = (props) => {
  return (
    <div className={`${Styles.card}`}>
      <div className={`${Styles.title}`}>{props.title}</div>
      <hr></hr>
      <h2 className={`${Styles.recipient}`}>
        {props.recipient}({props.rollNumber})
      </h2>
      <div className={`${Styles.course}`}>{props.course}</div>
      <div className={`${Styles.view}`}>
        <Button onClick={props.onClick}>
          <span>View</span> <FontAwesomeIcon icon={faArrowRight} />
        </Button>
      </div>
    </div>
  );
};

export default ChatCard;
