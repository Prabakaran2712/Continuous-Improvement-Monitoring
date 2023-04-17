import styles from "./Input.module.css";
const Input = (props) => {
  return (
    <div className="form-group mx-5 my-3">
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
