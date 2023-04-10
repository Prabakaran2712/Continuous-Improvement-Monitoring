const Date = () => {
  return (
    <div className="form-group mx-5 my-3">
      <label className={`my-3 `}>{props.label}</label>
      <input
        type="date"
        className={`form-control} `}
        {...props.register(props.name, props.conditions)}
      />
    </div>
  );
};

export default Date;
