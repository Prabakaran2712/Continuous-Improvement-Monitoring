const Select = (props) => {
  return (
    <div className="form-group  mx-5 my-3">
      <label className="my-3">{props.label}</label>
      <select
        className="form-select"
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
