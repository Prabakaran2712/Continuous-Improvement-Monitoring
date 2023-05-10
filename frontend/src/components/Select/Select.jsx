const Select = (props) => {
  return (
    <div className="form-group   ">
      <label className="my-3">{props.label}</label>
      <select
        className="form-select"
        onChange={props.onChange && props.onChange}
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
