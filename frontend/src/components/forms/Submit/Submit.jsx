const Submit = (props) => {
  return (
    <input
      type="submit"
      className="form-control btn btn-outline-success w-50 shadow"
      value={props.name}
    />
  );
};

export default Submit;
