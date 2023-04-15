import { MobileTimePicker } from "@mui/x-date-pickers";
import styles from "./TimeComponent.module.css";
const TimeComponent = (props) => {
  return (
    <div className="form-group mx-5 my-3">
      <label className={`my-3 ${styles.label}`}>{props.label}</label>
      <br />
      <MobileTimePicker
        className={` ${styles.input}`}
        label=""
        value={props.value ? props.value : ""}
        onChange={props.onChange}
      />
    </div>
  );
};

export default TimeComponent;
