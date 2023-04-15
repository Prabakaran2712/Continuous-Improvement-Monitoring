import Button from "@mui/material/Button";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import styles from "./DateComponent.module.css";
const DateComponent = (props) => {
  return (
    <div className="form-group mx-5 my-3">
      <label className={`my-3 ${styles.label}`}>{props.label}</label>
      <br />
      <DatePicker
        className={` ${styles.input}`}
        label=""
        value={props.value ? props.value : ""}
        onChange={props.onChange}
      />
    </div>
  );
};

export default DateComponent;
