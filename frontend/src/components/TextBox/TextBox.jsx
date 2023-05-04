import { useCallback, useState } from "react";
import Styles from "./TextBox.module.css";

const TextBox = (props) => {
  const [rows, setRows] = useState(1);
  const onContentChange = useCallback((evt) => {
    console.log(evt.target.value);
    props.setMessage(evt.target.value);
    setRows(event.target.value.split("\n").length);
  }, []);
  return (
    <div className={`${Styles.messageWrapper} `}>
      <textarea
        placeholder="Type your message here..."
        rows={rows < 4 ? rows : 4}
        wrap="soft"
        className={`${Styles.messageText} `}
        onChange={onContentChange}
        onBlur={onContentChange}
        value={props.message}
      />
    </div>
  );
};

export default TextBox;
