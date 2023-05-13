import Button from "@mui/material/Button";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Styles from "./DateComponent.module.css";
const DateComponent = (props) => {
  return (
    <div className="form-group mx-5 my-3">
      <label className={`my-3 ${Styles.label}`}>{props.label}</label>
      <br />
      <DatePicker
        className={` ${Styles.input}`}
        label=""
        value={props.value ? props.value : ""}
        onChange={props.onChange}
        defaultValue={props.defaultValue ? props.defaultValue : ""}
      />
    </div>
  );
};

export default DateComponent;
