const Button = (props) => {
  if (props.type == "success")
    return (
      <button className="btn btn-outline-success" onClick={props.onClick}>
        {props.name}
      </button>
    );
  else if (props.type == "danger")
    return (
      <button className="btn btn-outline-danger" onClick={props.onClick}>
        {props.name}
      </button>
    );
  else if (props.type == "warning")
    return (
      <button className="btn btn-outline-warning" onClick={props.onClick}>
        {props.name}
      </button>
    );
  else if (props.type == "info")
    return (
      <button className="btn btn-outline-info" onClick={props.onClick}>
        {props.name}
      </button>
    );
  else if (props.type == "light")
    return (
      <button className="btn btn-outline-light" onClick={props.onClick}>
        {props.name}
      </button>
    );
  else if (props.type == "dark")
    return (
      <button className="btn btn-outline-dark" onClick={props.onClick}>
        {props.name}
      </button>
    );
  else
    return (
      <button className="btn btn-outline-primary" onClick={props.onClick}>
        {props.name}
      </button>
    );
};

export default Button;
