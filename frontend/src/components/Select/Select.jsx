import Styles from "./Select.module.css";
const Select = (props) => {
  return (
    <div className={` form-group  ${Styles.select}`}>
      {props.label && (
        <label className={`my-lg-3 ${Styles.label}`}>{props.label}</label>
      )}
      <select
        className={`form-select ${Styles.input}`}
        onChange={props.onChange && props.onChange}
        value={props.value && props.value}
      >
        {props.options &&
          props.options.map((option, i) => (
            <option
              value={props.values && props.values[i]}
              key={props.values && props.values[i]}
            >
              {option}
            </option>
          ))}
      </select>
    </div>
  );
};

export default Select;
