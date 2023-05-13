import Styles from "./Select.module.css";
const Select = (props) => {
  return (
    <div className={`form-group mx-md-5 my-sm-3 mx-5    ${Styles.select}`}>
      <label className={`my-3 ${Styles.label}`}>{props.label}</label>
      <select
        className={`form-select ${Styles.input}`}
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
