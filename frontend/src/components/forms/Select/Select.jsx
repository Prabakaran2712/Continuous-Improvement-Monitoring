import Styles from "./Select.module.css";
import { useEffect, useState } from "react";
const Select = (props) => {
  const [value, setValue] = useState();

  return (
    <div className={`form-group   ${Styles.select}`}>
      <label className={`my-lg-3 ${Styles.label}`}>{props.label}</label>
      <select
        className={`form-select ${Styles.input}`}
        value={value}
        onChange={(event) => {
          setValue(event.target.value);
          console.log("Selected value:", value);
        }}
        {...props.register(props.name, { required: true })}
      >
        {props.options &&
          props.options.map((option, i) => (
            <option value={props.values[i]} key={props.values[i]}>
              {option}
            </option>
          ))}
      </select>
    </div>
  );
};

export default Select;
