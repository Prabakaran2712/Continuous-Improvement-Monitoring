import Styles from "./ChatHeader.module.css";
import moment from "moment";
import { useState } from "react";
import IconButton from "../../Button/IconButton/IconButton";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

import Button from "../../Button/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const ChatHeader = (props) => {
  const data = props.data;
  const [name, setName] = useState("");

  useState(() => {
    if (props.role == "student") {
      setName(data.teaches.teacher.name);
    } else {
      setName(data.student.name);
    }
  }, []);

  return (
    <div className={`${Styles.chatHeader} mb-3`}>
      <div className={`${Styles.titleOptions}`}>
        <div className={`${Styles.title}`}>{data.title}</div>
        {props.isClosed ? (
          <div className={`${Styles.coption}`}>
            <Button disabled={true} name={"Discussion Closed"}></Button>
          </div>
        ) : (
          <div className={`${Styles.option}`}>
            <Button
              loadingText={"Closing Discussion"}
              name={
                <span>
                  Close Discussion
                  <span>
                    <FontAwesomeIcon icon={faCheck} size={"1x"} />
                  </span>
                </span>
              }
              onClick={props.onClick}
            ></Button>
          </div>
        )}
      </div>
      <div className={`${Styles.chatDetails}`}>
        <div className={`${Styles.name}`}>{data.student.name}</div>
        <div className={`${Styles.created}`}>
          Created :{" "}
          <span>{moment(data.createdAt).format("hh:mm a, MMMM Do YYYY")}</span>
        </div>
        <hr />
        <div className={`${Styles.subjectCode}`}>
          {data.teaches.course.subject_code}
          {" - "}{" "}
          <span className={`${Styles.subjectName}`}>
            {data.teaches.course.name}
          </span>
        </div>

        <div className={`${Styles.department}`}>
          {data.teaches.course.department.dept_name}
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
