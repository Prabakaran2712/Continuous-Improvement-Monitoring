import Styles from "./Title.module.css";

const Title = (props) => {
  if (props.size && props.size == "md")
    return <div className={`${Styles.md}`}>{props.title} </div>;
  return <div className={`${Styles.title}`}>{props.title} </div>;
};

export default Title;
