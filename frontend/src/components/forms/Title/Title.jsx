import Styles from "./Title.module.css";

const Title = (props) => {
  return <div className={`${Styles.title}`}>{props.title} </div>;
};

export default Title;
