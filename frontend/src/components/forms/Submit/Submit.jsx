import Styles from "./Submit.module.css";
const Submit = (props) => {
  return (
    <input
      type="submit"
      className={`form-control btn btn-outline-dark  shadow ${Styles.submit}`}
      value={props.name}
    />
  );
};

export default Submit;
