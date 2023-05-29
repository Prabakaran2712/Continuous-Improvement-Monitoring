import { MobileTimePicker } from "@mui/x-date-pickers";
import Styles from "./TimeComponent.module.css";
const TimeComponent = (props) => {
  return (
    <div className="form-group ">
      <label className={`my-3 ${Styles.label}`}>{props.label}</label>
      <br />
      <MobileTimePicker
        className={` ${Styles.input}`}
        label=""
        value={props.value ? props.value : ""}
        onChange={props.onChange}
      />
    </div>
  );
};

export default TimeComponent;
