import styles from "./Input.module.css";
const Input = (props) => {
  return (
    <div className="form-group mx-md-5 my-sm-3 mx-sm-4">
      <label className={`my-3 ${styles.label}`}>{props.label}</label>
      <input
        type={props.type}
        className={`form-control ${styles.input} `}
        {...props.register(props.name, props.conditions)}
        step={"any"}
        disabled={props.disabled ? props.disabled : false}
      />
    </div>
  );
};

export default Input;
