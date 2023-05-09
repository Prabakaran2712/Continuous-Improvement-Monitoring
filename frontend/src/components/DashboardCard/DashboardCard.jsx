import Styles from "./DashboardCard.module.css";
import { Link } from "react-router-dom";
const DashboardCard = (props) => {
  return (
    <Link to={props.options.link} className={`${Styles.cardSingleLink}`}>
      <div className={`${Styles.cardSingle}`}>
        <div className={`${Styles.cardText}`}>
          <div>
            <h1>{props.options.value}</h1>
            <span>{props.options.name}</span>
          </div>
          <div className={`${Styles.cardSingleIcon}`}>
            <span> {props.options.icon}</span>
          </div>
        </div>
        {props.options.graph ? (
          <div className={`${Styles.cardGraph}`}></div>
        ) : (
          <></>
        )}
      </div>
    </Link>
  );
};

export default DashboardCard;
